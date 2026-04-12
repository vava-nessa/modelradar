import { r as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { u as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Container } from "./Container-CgY9s-MS.mjs";
import { o as useResetPassword, r as isSupabaseConfigured, t as formatAuthError } from "./auth-DtuNQAhG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reset-password-BM8wxbDw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ResetPasswordPage() {
	const [password, setPassword] = (0, import_react.useState)("");
	const [confirmPassword, setConfirmPassword] = (0, import_react.useState)("");
	const [done, setDone] = (0, import_react.useState)(false);
	const [localError, setLocalError] = (0, import_react.useState)(null);
	const resetPassword = useResetPassword();
	const configured = isSupabaseConfigured();
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLocalError(null);
		if (!password) {
			setLocalError("Please enter a new password");
			return;
		}
		if (password.length < 6) {
			setLocalError("Password must be at least 6 characters");
			return;
		}
		if (password !== confirmPassword) {
			setLocalError("Passwords do not match");
			return;
		}
		try {
			await resetPassword.mutateAsync(password);
			setDone(true);
		} catch {}
	};
	const displayError = localError || (resetPassword.isError ? formatAuthError(resetPassword.error) : null);
	if (done) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "flex min-h-[60vh] items-center justify-center py-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md space-y-8 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-4xl",
						children: "✓"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-xl font-bold",
						children: "Password updated"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-[var(--color-text-muted)]",
						children: "Your password has been successfully reset. You can now sign in with your new password."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/login",
				className: "flex w-full items-center justify-center rounded-md bg-[var(--color-accent)] px-4 py-2 text-white hover:opacity-90",
				children: "Go to sign in"
			})]
		})
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "flex min-h-[60vh] items-center justify-center py-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md space-y-8 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-bold",
						children: "Set new password"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-[var(--color-text-muted)]",
						children: "Enter your new password below"
					})]
				}),
				!configured && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-md bg-yellow-50 p-4 text-sm text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: "⚠️ Authentication not configured"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs",
						children: "Please set up Supabase environment variables to enable password reset."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSubmit,
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "password",
							className: "block text-sm font-medium",
							children: "New password"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "password",
							type: "password",
							value: password,
							onChange: (e) => {
								setPassword(e.target.value);
								setLocalError(null);
							},
							required: true,
							minLength: 6,
							disabled: !configured || resetPassword.isPending,
							className: "mt-1 block w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
							placeholder: "••••••••"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "confirm-password",
							className: "block text-sm font-medium",
							children: "Confirm new password"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "confirm-password",
							type: "password",
							value: confirmPassword,
							onChange: (e) => {
								setConfirmPassword(e.target.value);
								setLocalError(null);
							},
							required: true,
							minLength: 6,
							disabled: !configured || resetPassword.isPending,
							className: "mt-1 block w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
							placeholder: "••••••••"
						})] }),
						displayError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-200",
							children: displayError
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: !configured || resetPassword.isPending,
							className: "w-full rounded-md bg-[var(--color-accent)] px-4 py-2 text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50",
							children: resetPassword.isPending ? "Updating..." : "Update password"
						})
					]
				})
			]
		})
	}) });
}
//#endregion
export { ResetPasswordPage as component };
