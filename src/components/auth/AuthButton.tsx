import { useAuth, useSignOut } from "@/lib/auth";

export function AuthButton() {
  const { data: user } = useAuth();
  const signOut = useSignOut();

  if (user) {
    return (
      <button
        type="button"
        onClick={() => signOut.mutate()}
        className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
      >
        Logout
      </button>
    );
  }

  return null;
}
