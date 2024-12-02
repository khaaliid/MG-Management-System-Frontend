"use client";
import { SessionProvider, useSession } from "next-auth/react";
import Login from "../components/login";
import React from "react";

export function withAuth(Component: React.FC) {
  return function AuthenticatedComponent() {
    const { data: session, status } = useSession();
    
    if (status === "loading") return <div>Loading...</div>;
    if (!session) return <Login />;
    
    return <SessionProvider><Component /></SessionProvider>;
  };
}
