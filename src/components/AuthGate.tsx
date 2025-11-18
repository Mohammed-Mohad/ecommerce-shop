"use client";

import { useEffect, useState } from "react";
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
  const [isHydrated, setIsHydrated] = useState(false);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    // This flag ensures the server and first client render match before we reveal gated content.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="rounded-3xl border border-border/70 bg-card/80 p-8 shadow-primary/5 backdrop-blur-sm">
        <div
          className="space-y-4"
          aria-hidden="true"
        >
          <div className="h-6 w-40 animate-pulse rounded-full bg-muted/40" />
          <div className="h-4 w-2/3 animate-pulse rounded-full bg-muted/20" />
          <div className="h-10 w-32 animate-pulse rounded-2xl bg-muted/30" />
        </div>
      </div>
    );
  }

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
