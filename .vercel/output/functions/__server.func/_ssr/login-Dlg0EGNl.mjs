import { r as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as Container } from "./Container-CgY9s-MS.mjs";
import { a as useSignInWithEmail, o as useSignInWithGithub, r as isSupabaseConfigured, t as formatAuthError } from "./auth-D3uBDTIm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-Dlg0EGNl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginPage() {
	const [email, setEmail] = (0, import_react.useState)("");
	const [sent, setSent] = (0, import_react.useState)(false);
	const [localError, setLocalError] = (0, import_react.useState)(null);
	const signInWithEmail = useSignInWithEmail();
	const signInWithGithub = useSignInWithGithub();
	const configured = isSupabaseConfigured();
	const handleEmailSubmit = async (e) => {
		e.preventDefault();
		setLocalError(null);
		if (!email.trim()) {
			setLocalError("Please enter your email address");
			return;
		}
		try {
			await signInWithEmail.mutateAsync(email.trim());
			setSent(true);
		} catch {}
	};
	const handleGithubSignIn = async () => {
		setLocalError(null);
		try {
			await signInWithGithub.mutateAsync();
		} catch {}
	};
	const displayError = localError || (signInWithEmail.isError ? formatAuthError(signInWithEmail.error) : null) || (signInWithGithub.isError ? formatAuthError(signInWithGithub.error) : null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "flex min-h-[60vh] items-center justify-center py-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md space-y-8 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-bold",
						children: "Sign in to ModelRadar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-[var(--color-text-muted)]",
						children: "Save your favorite models and compare providers"
					})]
				}),
				!configured && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-md bg-yellow-50 p-4 text-sm text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: "⚠️ Authentication not configured"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs",
						children: "Please set up Supabase environment variables to enable sign in."
					})]
				}),
				sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-4xl",
							children: "✉️"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm",
							children: "Check your email for a magic link to sign in."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setSent(false),
							className: "text-sm text-[var(--color-accent)] hover:underline",
							children: "Use a different email"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleEmailSubmit,
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "email",
							className: "block text-sm font-medium",
							children: "Email address"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "email",
							type: "email",
							value: email,
							onChange: (e) => {
								setEmail(e.target.value);
								setLocalError(null);
							},
							required: true,
							disabled: !configured || signInWithEmail.isPending,
							className: "mt-1 block w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
							placeholder: "you@example.com"
						})] }),
						displayError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-200",
							children: displayError
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: !configured || signInWithEmail.isPending,
							className: "w-full rounded-md bg-[var(--color-accent)] px-4 py-2 text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50",
							children: signInWithEmail.isPending ? "Sending..." : "Send magic link"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 flex items-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-full border-t border-[var(--color-border)]" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative flex justify-center text-xs uppercase",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "bg-[var(--color-surface)] px-2 text-[var(--color-text-muted)]",
							children: "Or continue with"
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: handleGithubSignIn,
					disabled: !configured || signInWithGithub.isPending,
					className: "flex w-full items-center justify-center gap-2 rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2 text-sm hover:bg-[var(--color-surface)] disabled:cursor-not-allowed disabled:opacity-50",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
						className: "h-5 w-5",
						viewBox: "0 0 24 24",
						fill: "currentColor",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.81.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" })
					}), signInWithGithub.isPending ? "Connecting..." : "Continue with GitHub"]
				})
			]
		})
	}) });
}
//#endregion
export { LoginPage as component };
