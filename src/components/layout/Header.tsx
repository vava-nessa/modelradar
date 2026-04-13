import { useAuth, useSignOut, isSupabaseConfigured } from "@/lib/auth";
import { Link } from "@tanstack/react-router";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const { data: user, isLoading, error } = useAuth();
  const signOut = useSignOut();

  const handleSignOut = async () => {
    try {
      await signOut.mutateAsync();
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  return (
    <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 px-4 backdrop-blur-md lg:px-6">
      <div className="flex items-center gap-6">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <span className="text-[var(--color-accent)]">◆</span>
          <span>ModelRadar</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link
            to="/"
            className="text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            activeProps={{ className: "text-[var(--color-text)]" }}
          >
            Models
          </Link>
          <Link
            to="/providers"
            className="text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            activeProps={{ className: "text-[var(--color-text)]" }}
          >
            Providers
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-3 text-sm">
          <ThemeToggle />
          {isLoading ? (
            <span className="text-[var(--color-text-muted)]">...</span>
          ) : user ? (
            <>
              <Link
                to="/favorites"
                className="text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
              >
                ★ Favorites
              </Link>
              <span className="max-w-[150px] truncate text-[var(--color-text-muted)]">
                {user.email}
              </span>
              <button
                type="button"
                onClick={handleSignOut}
                disabled={signOut.isPending}
                className="rounded-md px-2 py-1 text-[var(--color-text-muted)] hover:bg-[var(--color-surface)] disabled:cursor-not-allowed"
              >
                {signOut.isPending ? "..." : "Logout"}
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signup"
                className="rounded-md px-3 py-1.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
              >
                Sign up
              </Link>
              <Link
                to="/login"
                className="rounded-md bg-[var(--color-accent)] px-3 py-1.5 text-white hover:opacity-90"
              >
                Sign in
              </Link>
            </>
          )}
        </div>
    </header>
  );
}