import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { useSignInWithEmail, useSignInWithGithub, formatAuthError, isSupabaseConfigured } from "@/lib/auth";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const signInWithEmail = useSignInWithEmail();
  const signInWithGithub = useSignInWithGithub();

  const configured = isSupabaseConfigured();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!email.trim()) {
      setLocalError("Please enter your email address");
      return;
    }

    try {
      await signInWithEmail.mutateAsync(email.trim());
      setSent(true);
    } catch {
      // Error is handled by the mutation
    }
  };

  const handleGithubSignIn = async () => {
    setLocalError(null);
    try {
      await signInWithGithub.mutateAsync();
    } catch {
      // Error is handled by the mutation
    }
  };

  const displayError = localError
    || (signInWithEmail.isError ? formatAuthError(signInWithEmail.error) : null)
    || (signInWithGithub.isError ? formatAuthError(signInWithGithub.error) : null);

  return (
    <Container>
      <main className="flex min-h-[60vh] items-center justify-center py-12">
        <div className="w-full max-w-md space-y-8 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Sign in to ModelRadar</h1>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              Save your favorite models and compare providers
            </p>
          </div>

          {!configured && (
            <div className="rounded-md bg-yellow-50 p-4 text-sm text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200">
              <p className="font-medium">⚠️ Authentication not configured</p>
              <p className="mt-1 text-xs">
                Please set up Supabase environment variables to enable sign in.
              </p>
            </div>
          )}

          {sent ? (
            <div className="space-y-4 text-center">
              <div className="text-4xl">✉️</div>
              <p className="text-sm">
                Check your email for a magic link to sign in.
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="text-sm text-[var(--color-accent)] hover:underline"
              >
                Use a different email
              </button>
            </div>
          ) : (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
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
                  disabled={!configured || signInWithEmail.isPending}
                  className="mt-1 block w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="you@example.com"
                />
              </div>
              {displayError && (
                <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-200">
                  {displayError}
                </div>
              )}
              <button
                type="submit"
                disabled={!configured || signInWithEmail.isPending}
                className="w-full rounded-md bg-[var(--color-accent)] px-4 py-2 text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {signInWithEmail.isPending ? "Sending..." : "Send magic link"}
              </button>
            </form>
          )}

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--color-border)]" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[var(--color-surface)] px-2 text-[var(--color-text-muted)]">
                Or continue with
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGithubSignIn}
            disabled={!configured || signInWithGithub.isPending}
            className="flex w-full items-center justify-center gap-2 rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2 text-sm hover:bg-[var(--color-surface)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.81.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            {signInWithGithub.isPending ? "Connecting..." : "Continue with GitHub"}
          </button>
        </div>
      </main>
    </Container>
  );
}