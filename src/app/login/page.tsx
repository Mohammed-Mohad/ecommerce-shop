"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RootState } from "@/store/store";
import { login, logout } from "@/store/authSlice";

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const userName = useSelector((state: RootState) => state.auth.userName);
  const [name, setName] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim()) return;
    dispatch(login({ name: name.trim() }));
    router.push(redirectTo);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <main className="container mx-auto flex min-h-[70vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6 rounded-3xl border border-border/70 bg-card/90 p-8 shadow-xl shadow-primary/10">
        <div className="space-y-2 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Demo access
          </p>
          <h1 className="text-3xl font-semibold text-foreground">
            {isAuthenticated ? "You are signed in" : "Sign in to continue"}
          </h1>
          <p className="text-muted-foreground">
            Use any name to enter. This authentication is for demo purposes
            only.
          </p>
        </div>

        {isAuthenticated ? (
          <div className="space-y-4 text-center">
            <p className="text-lg font-medium">
              Welcome back, {userName ?? "guest"}!
            </p>
            <div className="flex flex-col gap-3">
              <Button asChild>
                <Link href="/">Return to homepage</Link>
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                Sign out
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2 text-left">
              <label className="text-sm font-medium text-foreground">
                Display name
              </label>
              <Input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Jane Doe"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Sign in
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              By signing in you agree to the mock experience of this demo.
            </p>
          </form>
        )}
      </div>
    </main>
  );
}

