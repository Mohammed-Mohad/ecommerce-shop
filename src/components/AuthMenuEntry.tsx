"use client";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { RootState } from "@/store/store";
import { logout } from "@/store/authSlice";

export default function AuthMenuEntry({
  variant = "button",
}: {
  variant?: "button" | "link";
}) {
  const dispatch = useDispatch();
  const { isAuthenticated, userName } = useSelector(
    (state: RootState) => state.auth
  );

  if (isAuthenticated) {
    if (variant === "button") {
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => dispatch(logout())}
          className="text-muted-foreground hover:text-foreground"
        >
          Sign out
        </Button>
      );
    }
    return (
      <button
        type="button"
        onClick={() => dispatch(logout())}
        className="flex w-full items-center gap-3 rounded-md p-3 text-base font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
      >
        <span role="img" aria-hidden="true">
          👋
        </span>
        <span>Sign out ({userName ?? "guest"})</span>
      </button>
    );
  }

  if (variant === "button") {
    return (
      <Button variant="ghost" size="sm" asChild>
        <Link href="/login">Login</Link>
      </Button>
    );
  }

  return (
    <Link
      href="/login"
      className="flex items-center gap-3 rounded-md p-3 text-base font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
    >
      <span role="img" aria-hidden="true">
        🔐
      </span>
      <span>Sign in</span>
    </Link>
  );
}

