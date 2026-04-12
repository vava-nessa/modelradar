import { useAuth } from "@/lib/auth";
import { Navigate } from "@tanstack/react-router";

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { data: user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-[var(--color-text-muted)]">Loading...</p>
      </div>
    );
  }

  if (!user) {
    throw new Navigate({ to: "/login" });
  }

  return <>{children}</>;
}
