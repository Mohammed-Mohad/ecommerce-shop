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
} from "@/components/ui/sheet";
import { Separator } from "./ui/separator";
import CartSheet from "./CartSheet";

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
          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            <Button
              variant="ghost"
              asChild
              className="gap-1.5 text-muted-foreground"
            >
              <Link href="/favorites">
                <Star className="h-4 w-4" />
                Favorites
              </Link>
            </Button>
            <Button
              variant="ghost"
              asChild
              className="gap-1.5 text-muted-foreground"
            >
              <Link href="/products/new">
                <PlusCircle className="h-4 w-4" />
                Create
              </Link>
            </Button>
          </nav>

          <div className="hidden md:block">
            <Separator orientation="vertical" className="mx-2 h-6" />
          </div>

          <CartSheet />

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
                  <Link href="/" className="flex items-center gap-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <ShoppingBag className="h-5 w-5" />
                    </span>
                    <span className="text-lg font-semibold text-foreground">
                      MexShop
                    </span>
                  </Link>
                </SheetHeader>
                <div className="mt-6 flex h-full flex-col">
                  <div className="px-2">
                    <SearchBar />
                  </div>
                  <nav className="mt-6 flex flex-col gap-2 px-2">
                    <Link
                      href="/favorites"
                      className="flex items-center gap-3 rounded-md p-3 text-base font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
                    >
                      <Star className="h-5 w-5 text-muted-foreground" />
                      <span>Favorites</span>
                    </Link>
                    <Link
                      href="/products/new"
                      className="flex items-center gap-3 rounded-md p-3 text-base font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
                    >
                      <PlusCircle className="h-5 w-5 text-muted-foreground" />
                      <span>Create Product</span>
                    </Link>
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
