import { useState } from "react";
import { Container } from "@/components/layout/Container";
import {
  useSignUpWithEmail,
  formatAuthError,
  isSupabaseConfigured,
} from "@/lib/auth";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/signup")({
  component: SignupPage,
});

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [sent, setSent] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const signUpWithEmail = useSignUpWithEmail();

  const configured = isSupabaseConfigured();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!email.trim()) {
      setLocalError("Please enter your email address");
      return;
    }
    if (!password) {
      setLocalError("Please enter a password");
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
      await signUpWithEmail.mutateAsync({
        email: email.trim(),
        password,
      });
      setSent(true);
    } catch {
      // Error is handled by the mutation
    }
  };

  const displayError = localError
    || (signUpWithEmail.isError ? formatAuthError(signUpWithEmail.error) : null);

  if (sent) {
    return (
      <Container>
        <main className="flex min-h-[60vh] items-center justify-center py-12">
          <div className="w-full max-w-md space-y-8 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
            <div className="space-y-4 text-center">
              <div className="text-4xl">✉️</div>
              <h1 className="text-xl font-bold">Check your email</h1>
              <p className="text-sm text-[var(--color-text-muted)]">
                We sent a confirmation link to <strong>{email}</strong>.
                Click the link in the email to activate your account.
              </p>
            </div>
            <p className="text-center text-sm text-[var(--color-text-muted)]">
              Already have an account?{" "}
              <Link to="/login" className="text-[var(--color-accent)] hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </main>
      </Container>
    );
  }

  return (
    <Container>
      <main className="flex min-h-[60vh] items-center justify-center py-12">
        <div className="w-full max-w-md space-y-8 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Create your account</h1>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              Sign up to save your favorite models and compare providers
            </p>
          </div>

          {!configured && (
            <div className="rounded-md bg-yellow-50 p-4 text-sm text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200">
              <p className="font-medium">⚠️ Authentication not configured</p>
              <p className="mt-1 text-xs">
                Please set up Supabase environment variables to enable sign up.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setLocalError(null);
                }}
                required
                disabled={!configured || signUpWithEmail.isPending}
                className="mt-1 block w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setLocalError(null);
                }}
                required
                minLength={6}
                disabled={!configured || signUpWithEmail.isPending}
                className="mt-1 block w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium">
                Confirm password
              </label>
              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setLocalError(null);
                }}
                required
                minLength={6}
                disabled={!configured || signUpWithEmail.isPending}
                className="mt-1 block w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="••••••••"
              />
            </div>
            {displayError && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-200">
                {displayError}
              </div>
            )}
            <button
              type="submit"
              disabled={!configured || signUpWithEmail.isPending}
              className="w-full rounded-md bg-[var(--color-accent)] px-4 py-2 text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {signUpWithEmail.isPending ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="text-center text-sm text-[var(--color-text-muted)]">
            Already have an account?{" "}
            <Link to="/login" className="text-[var(--color-accent)] hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </main>
    </Container>
  );
}