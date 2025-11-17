"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Button } from "@/components/ui/button";

interface AuthGateProps {
  children: React.ReactNode;
  message?: string;
}

export default function AuthGate({
  children,
  message = "Please sign in to access this feature.",
}: AuthGateProps) {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  if (!isAuthenticated) {
    return (
      <div className="rounded-3xl border border-dashed border-primary/40 bg-card/70 p-8 text-center shadow-sm">
        <h2 className="text-2xl font-semibold text-foreground">
          Authentication required
        </h2>
        <p className="mt-2 text-muted-foreground">{message}</p>
        <div className="mt-6 flex justify-center">
          <Button asChild size="lg">
            <Link href="/login">Go to login</Link>
          </Button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

