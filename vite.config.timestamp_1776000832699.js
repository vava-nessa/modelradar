import { resolve } from "path";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
// vite.config.ts
import { defineConfig } from "vite";
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  plugins: [tailwindcss(), tanstackStart(), react()],
});
export { vite_config_default as default };
