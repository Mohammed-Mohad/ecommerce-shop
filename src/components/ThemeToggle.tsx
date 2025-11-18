"use client";

import { Moon, Sun } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { RootState } from "@/store/store";
import { toggleTheme } from "@/store/themeSlice";

type ThemeToggleVariant = "card" | "menu" | "icon";

interface ThemeToggleProps {
  variant?: ThemeToggleVariant;
}

export function ThemeToggle({ variant = "card" }: ThemeToggleProps) {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  if (variant === "menu") {
    return (
      <button
        type="button"
        onClick={handleToggle}
        className="flex w-full items-center gap-3 rounded-md p-3 text-base font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
      >
        <span className="relative flex h-5 w-5 items-center justify-center text-muted-foreground">
          <Sun
            className={cn(
              "h-5 w-5 transition-all",
              mode === "light" ? "rotate-0 scale-100" : "-rotate-90 scale-0"
            )}
          />
          <Moon
            className={cn(
              "absolute h-5 w-5 transition-all",
              mode === "light" ? "rotate-90 scale-0" : "rotate-0 scale-100"
            )}
          />
        </span>
        <span>
          {mode === "light" ? "Switch to dark mode" : "Switch to light mode"}
        </span>
      </button>
    );
  }

  if (variant === "icon") {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={handleToggle}
        aria-label="Toggle theme"
        className="h-10 w-10 rounded-2xl border border-transparent text-muted-foreground hover:border-border/60 hover:bg-accent"
      >
        <Sun
          className={cn(
            "h-5 w-5 transition-all",
            mode === "light" ? "rotate-0 scale-100" : "-rotate-90 scale-0"
          )}
        />
        <Moon
          className={cn(
            "absolute h-5 w-5 transition-all",
            mode === "light" ? "rotate-90 scale-0" : "rotate-0 scale-100"
          )}
        />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  return (
    <div className="flex items-center justify-between rounded-md border p-2">
      <span className="px-2 text-sm font-medium text-muted-foreground">
        Theme
      </span>
      <div className="relative">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleToggle}
          aria-label="Toggle theme"
          className={cn(
            "h-8 w-8 rounded-full border border-border/60 bg-card/70"
          )}
        >
          <Sun
            className={cn(
              "h-4 w-4 transition-all",
              mode === "light" ? "rotate-0 scale-100" : "-rotate-90 scale-0"
            )}
          />
          <Moon
            className={cn(
              "absolute h-4 w-4 transition-all",
              mode === "light" ? "rotate-90 scale-0" : "rotate-0 scale-100"
            )}
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </div>
  );
}
