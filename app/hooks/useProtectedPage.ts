// src/hooks/useProtectedPage.ts
import { useSession } from "next-auth/react";

export function useProtectedPage() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return { session, loading };
}
