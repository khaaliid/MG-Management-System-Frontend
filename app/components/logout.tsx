"use client"
import { signOut } from "next-auth/react";
export default function Logout() {
  return <button onClick={() => signOut({
    callbackUrl: "/api/auth/logout",
  })}>
    Signout of keycloak
  </button>
}