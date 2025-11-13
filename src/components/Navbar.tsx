import Link from "next/link";
import { ShoppingCart, Package } from "lucide-react";
import SearchBar from "./SearchBar";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="flex items-center space-x-2 mr-6">
          <Package className="h-6 w-6" />
          <span className="font-bold">Shop</span>
        </Link>
        
        <div className="flex flex-1 items-center justify-between space-x-4">
          <SearchBar />
          <nav className="flex items-center space-x-2">
            <button className="p-2">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Shopping Cart</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
