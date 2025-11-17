import Link from "next/link";
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

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
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
          <div className="hidden items-center gap-1.5 md:flex">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="text-muted-foreground hover:text-foreground"
            >
              <Link href="/favorites" aria-label="Favorites">
                <Star className="h-4 w-4" />
              </Link>
            </Button>
            <ThemeToggle variant="icon" />
            <AuthMenuEntry variant="button" />
            <CartSheet />
            <Button size="sm" asChild className="ml-1 gap-1.5">
              <Link href="/products/new">
                <PlusCircle className="h-4 w-4" />
                New Product
              </Link>
            </Button>
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
                        <Star className="h-5 w-5 text-muted-foreground" />
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
