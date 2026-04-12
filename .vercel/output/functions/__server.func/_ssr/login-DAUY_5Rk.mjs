import { r as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { u as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Container } from "./Container-CgY9s-MS.mjs";
import { a as useForgotPassword, c as useSignInWithGithub, l as useSignInWithPassword, r as isSupabaseConfigured, s as useSignInWithEmail, t as formatAuthError } from "./auth-DtuNQAhG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-DAUY_5Rk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginPage() {
	const [mode, setMode] = (0, import_react.useState)("password");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [sent, setSent] = (0, import_react.useState)(false);
	const [forgotSent, setForgotSent] = (0, import_react.useState)(false);
	const [localError, setLocalError] = (0, import_react.useState)(null);
	const [isForgotMode, setIsForgotMode] = (0, import_react.useState)(false);
	const signInWithEmail = useSignInWithEmail();
	const signInWithPassword = useSignInWithPassword();
	const signInWithGithub = useSignInWithGithub();
	const forgotPassword = useForgotPassword();
	const configured = isSupabaseConfigured();
	const handlePasswordSubmit = async (e) => {
		e.preventDefault();
		setLocalError(null);
		if (!email.trim()) {
			setLocalError("Please enter your email address");
			return;
		}
		if (!password) {
			setLocalError("Please enter your password");
			return;
		}
		try {
			await signInWithPassword.mutateAsync({
				email: email.trim(),
				password
			});
		} catch {}
	};
	const handleMagicLinkSubmit = async (e) => {
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
	const handleForgotSubmit = async (e) => {
		e.preventDefault();
		setLocalError(null);
		if (!email.trim()) {
			setLocalError("Please enter your email address");
			return;
		}
		try {
			await forgotPassword.mutateAsync(email.trim());
			setForgotSent(true);
		} catch {}
	};
	const handleGithubSignIn = async () => {
		setLocalError(null);
		try {
			await signInWithGithub.mutateAsync();
		} catch {}
	};
	const displayError = localError || (signInWithPassword.isError ? formatAuthError(signInWithPassword.error) : null) || (signInWithEmail.isError ? formatAuthError(signInWithEmail.error) : null) || (forgotPassword.isError ? formatAuthError(forgotPassword.error) : null) || (signInWithGithub.isError ? formatAuthError(signInWithGithub.error) : null);
	signInWithPassword.isPending || signInWithEmail.isPending || forgotPassword.isPending;
	if (isForgotMode && forgotSent) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "flex min-h-[60vh] items-center justify-center py-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md space-y-8 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-4xl",
						children: "✉️"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-xl font-bold",
						children: "Check your email"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-[var(--color-text-muted)]",
						children: [
							"We sent a password reset link to ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: email }),
							". Click the link in the email to reset your password."
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => {
					setIsForgotMode(false);
					setForgotSent(false);
				},
				className: "w-full text-sm text-[var(--color-accent)] hover:underline",
				children: "Back to sign in"
			})]
		})
	}) });
	if (isForgotMode) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "flex min-h-[60vh] items-center justify-center py-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md space-y-8 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-bold",
						children: "Reset your password"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-[var(--color-text-muted)]",
						children: "Enter your email and we'll send you a reset link"
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
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleForgotSubmit,
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "forgot-email",
							className: "block text-sm font-medium",
							children: "Email address"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "forgot-email",
							type: "email",
							value: email,
							onChange: (e) => {
								setEmail(e.target.value);
								setLocalError(null);
							},
							required: true,
							disabled: !configured || forgotPassword.isPending,
							className: "mt-1 block w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
							placeholder: "you@example.com"
						})] }),
						displayError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-200",
							children: displayError
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: !configured || forgotPassword.isPending,
							className: "w-full rounded-md bg-[var(--color-accent)] px-4 py-2 text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50",
							children: forgotPassword.isPending ? "Sending..." : "Send reset link"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setIsForgotMode(false),
					className: "w-full text-sm text-[var(--color-accent)] hover:underline",
					children: "Back to sign in"
				})
			]
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
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex rounded-md border border-[var(--color-border)] p-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							setMode("password");
							setSent(false);
							setLocalError(null);
						},
						className: `flex-1 rounded-md px-3 py-1.5 text-sm transition-colors ${mode === "password" ? "bg-[var(--color-accent)] text-white" : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"}`,
						children: "Password"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							setMode("magic");
							setSent(false);
							setLocalError(null);
						},
						className: `flex-1 rounded-md px-3 py-1.5 text-sm transition-colors ${mode === "magic" ? "bg-[var(--color-accent)] text-white" : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"}`,
						children: "Magic Link"
					})]
				}),
				mode === "magic" && sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
				}) : mode === "password" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handlePasswordSubmit,
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
							disabled: !configured || signInWithPassword.isPending,
							className: "mt-1 block w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
							placeholder: "you@example.com"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "password",
							className: "block text-sm font-medium",
							children: "Password"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "password",
							type: "password",
							value: password,
							onChange: (e) => {
								setPassword(e.target.value);
								setLocalError(null);
							},
							required: true,
							disabled: !configured || signInWithPassword.isPending,
							className: "mt-1 block w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
							placeholder: "••••••••"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex justify-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setIsForgotMode(true),
								className: "text-xs text-[var(--color-accent)] hover:underline",
								children: "Forgot password?"
							})
						}),
						displayError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-200",
							children: displayError
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: !configured || signInWithPassword.isPending,
							className: "w-full rounded-md bg-[var(--color-accent)] px-4 py-2 text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50",
							children: signInWithPassword.isPending ? "Signing in..." : "Sign in"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleMagicLinkSubmit,
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "magic-email",
							className: "block text-sm font-medium",
							children: "Email address"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "magic-email",
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
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-center text-sm text-[var(--color-text-muted)]",
					children: [
						"Don't have an account?",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/signup",
							className: "text-[var(--color-accent)] hover:underline",
							children: "Sign up"
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
