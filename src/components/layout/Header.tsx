import { useAuth } from "@/lib/auth";
import { Link } from "@tanstack/react-router";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const { data: user } = useAuth();

  return (
    <header className="sticky top-0 z-50 h-12 border-b border-[var(--color-border)] bg-[var(--color-bg)]">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4">
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
          {user ? (
            <>
              <Link
                to="/favorites"
                className="text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
              >
                ★ Favorites
              </Link>
              <span className="text-[var(--color-text-muted)]">
                {user.email}
              </span>
            </>
          ) : (
            <Link
              to="/login"
              className="rounded-md bg-[var(--color-accent)] px-3 py-1.5 text-white hover:opacity-90"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
