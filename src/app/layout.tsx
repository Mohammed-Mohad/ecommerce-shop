import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StoreProvider from "@/components/StoreProvider";
import { Toaster } from "@/components/ui/sonner";
import ThemeObserver from "@/components/ThemeObserver";
import ThemeScript from "@/components/ThemeScript";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Ecommerce Shop",
  description: "A modern ecommerce shop built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <ThemeScript />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <StoreProvider>
          <ThemeObserver />
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster
            richColors
            position="top-center"
            toastOptions={{
              duration: 3500,
              className:
                "rounded-xl border border-border/60 bg-card text-foreground shadow-xl shadow-primary/10",
            }}
          />
        </StoreProvider>
      </body>
    </html>
  );
}
