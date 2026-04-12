import { Header } from "@/components/layout/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import { useState } from "react";

import "@/styles/globals.css";

const THEME_INIT_SCRIPT = `(function(){
  try {
    var stored = window.localStorage.getItem('theme');
    var mode = (stored === 'light' || stored === 'dark' || stored === 'auto') 
      ? stored 
      : 'auto';
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var resolved = mode === 'auto' ? (prefersDark ? 'dark' : 'light') : mode;
    var root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(resolved);
    if (mode === 'auto') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', mode);
    }
    root.style.colorScheme = resolved;
  } catch(e) {}
})();`;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ModelRadar" },
      { name: "description", content: "Compare LLM models and providers" },
    ],
    scripts: [
      { children: THEME_INIT_SCRIPT, suppressHydrationWarning: true },
    ],
  }),
  component: RootDocument,
});

function RootDocument() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en" suppressHydrationWarning>
        <head>
          <HeadContent />
        </head>
        <body suppressHydrationWarning>
          <Header />
          <Outlet />
          <Scripts />
        </body>
      </html>
    </QueryClientProvider>
  );
}