"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  ShoppingBag,
  Star,
  Menu,
  PlusCircle,
  ShoppingCart,
} from "lucide-react";
import SearchBar from "./SearchBar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import CartSheet from "./CartSheet";
import { ThemeToggle } from "./ThemeToggle";
import { Separator } from "@/components/ui/separator";
import AuthMenuEntry from "./AuthMenuEntry";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/store/authSlice";
import { RootState } from "@/store/store";

export default function Navbar() {
  const dispatch = useDispatch();
  const { isAuthenticated, userName } = useSelector(
    (state: RootState) => state.auth
  );
  const favoritesCount = useSelector(
    (state: RootState) => state.favorites.ids.length
  );

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "border-b bg-background/95 backdrop-blur-sm"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
        {/* Left Side */}
        <div className="flex flex-1 items-center justify-start">
          <Link
            href="/"
            className="flex items-center gap-2"
            aria-label="MexShop Home"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <ShoppingBag className="h-5 w-5" />
            </span>
            <span className="hidden text-lg font-semibold text-foreground sm:inline-block">
              MexShop
            </span>
          </Link>
        </div>

        {/* Center: Search Bar */}
        <div className="hidden flex-1 items-center justify-center px-8 lg:flex">
          <div className="w-full max-w-md">
            <SearchBar />
          </div>
        </div>

        {/* Right Side: Actions */}
        <div className="flex flex-1 items-center justify-end gap-2">
          <div className="hidden items-center gap-1 md:flex">
            <Link
              href="/favorites"
              className="relative inline-flex items-center justify-center rounded-full p-2 text-muted-foreground transition hover:text-foreground"
              aria-label="Favorites"
            >
              <Star className="h-4 w-4" />
              {favoritesCount > 0 && (
                <span className="absolute -right-1 -top-1 rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-primary-foreground">
                  {favoritesCount}
                </span>
              )}
            </Link>
            <ThemeToggle variant="icon" />
            <CartSheet />
            <div className="ml-2">
              {isAuthenticated ? (
                <UserMenu
                  name={userName ?? "Guest"}
                  onLogout={() => dispatch(logout())}
                />
              ) : (
                <AuthMenuEntry variant="button" />
              )}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  <SheetDescription className="sr-only">
                    Access navigation links and search
                  </SheetDescription>
                  <SheetClose asChild>
                    <Link href="/" className="flex items-center gap-2">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <ShoppingBag className="h-5 w-5" />
                      </span>
                      <span className="text-lg font-semibold text-foreground">
                        MexShop
                      </span>
                    </Link>
                  </SheetClose>
                </SheetHeader>
                <div className="mt-6 flex h-full flex-col">
                  <div className="px-2">
                    <SearchBar />
                  </div>
                  <nav className="mt-6 flex flex-col gap-2 px-2">
                    <SheetClose asChild>
              <Link
                href="/favorites"
                className="flex items-center gap-3 rounded-md p-3 text-base font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
              >
                <div className="relative">
                  <Star className="h-5 w-5 text-muted-foreground" />
                  {favoritesCount > 0 && (
                    <span className="absolute -right-1 -top-1 rounded-full bg-primary px-1 py-0.5 text-[10px] font-semibold text-primary-foreground">
                      {favoritesCount}
                    </span>
                  )}
                </div>
                <span>Favorites</span>
              </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        href="/products/new"
                        className="flex items-center gap-3 rounded-md p-3 text-base font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
                      >
                        <PlusCircle className="h-5 w-5 text-muted-foreground" />
                        <span>Create Product</span>
                      </Link>
                    </SheetClose>
                    <div className="mt-2">
                      <ThemeToggle variant="menu" />
                    </div>
                    <div className="mt-2">
                      <AuthMenuEntry variant="link" />
                    </div>
                  </nav>
                  <Separator className="my-4" />
                  <div className="px-2">
                    <p className="mb-2 px-1 text-sm font-semibold text-muted-foreground">
                      My Cart
                    </p>
                    <CartSheet>
                      <div
                        role="button"
                        className="flex w-full items-center gap-3 rounded-md p-3 text-base font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
                      >
                        <ShoppingCart className="h-5 w-5 text-muted-foreground" />
                        <span>View Cart & Checkout</span>
                      </div>
                    </CartSheet>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

interface UserMenuProps {
  name: string;
  onLogout: () => void;
}

function UserMenu({ name, onLogout }: UserMenuProps) {
  const initials = useMemo(() => {
    const tokens = name
      .split(" ")
      .map((part) => part.trim())
      .filter(Boolean);
    return tokens.length
      ? tokens
          .slice(0, 2)
          .map((part) => part[0]?.toUpperCase())
          .join("")
      : "U";
  }, [name]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-primary/10 text-sm font-semibold uppercase text-primary transition hover:border-primary/50 hover:bg-primary/20"
        >
          {initials}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span className="text-xs uppercase text-muted-foreground">
              Signed in as
            </span>
            <span className="font-semibold text-foreground">{name}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/favorites" className="flex w-full items-center gap-2">
            Favorites
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/products/new" className="flex w-full items-center gap-2">
            Create Product
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/checkout" className="flex w-full items-center gap-2">
            Checkout
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={onLogout}
          className="text-destructive focus:text-destructive"
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
