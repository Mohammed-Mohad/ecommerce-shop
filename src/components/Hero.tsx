"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight, Star, Package, LayoutGrid, Clock, PlusCircle } from "lucide-react";

const featuredProduct = {
  id: 1,
  title: "Essence Mascara Lash Princess",
  description: "A popular choice for beauty.",
  rating: 4.5,
  thumbnail:
    "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
};

const renderStars = (rating: number) => {
  const totalStars = 5;
  const fullStars = Math.round(rating);
  const starElements = [];
  for (let i = 1; i <= totalStars; i++) {
    starElements.push(
      <Star
        key={i}
        className={`h-4 w-4 ${
          i <= fullStars ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    );
  }
  return starElements;
};

export default function Hero() {
  return (
    <section className="w-full bg-card">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.1),rgba(255,255,255,0))]"></div>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left Column: Text Content */}
          <div className="text-center lg:text-left">
            <p className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
              Curated Marketplace
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Discover your next favorite product.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Browse thousands of products, from beauty essentials to tech
              must-haves, powered by a real-world API simulation.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
              <Button asChild size="lg">
                <Link href="/products/new">
                  Add Product <PlusCircle className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="secondary"
                size="lg"
              >
                <Link href="/favorites">
                  Browse Favorites <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Column: Featured Product */}
          <div className="flex justify-center lg:justify-end">
            <Link href={`/product/${featuredProduct.id}`} className="group block">
              <div className="w-full max-w-sm rounded-2xl border bg-background/80 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:shadow-primary/20 group-hover:-translate-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Featured Product
                </p>
                <div className="mt-4 flex items-center gap-2">
                  {renderStars(featuredProduct.rating)}
                </div>
                <div className="relative mt-4 aspect-square w-full transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src={featuredProduct.thumbnail}
                    alt={featuredProduct.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="mt-4 text-center">
                  <h3 className="font-semibold">{featuredProduct.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {featuredProduct.description}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Integrated Stats Section */}
        <div className="mt-16 border-t pt-8">
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            <div className="flex flex-col items-center gap-2">
              <Package className="h-6 w-6 text-primary" />
              <div>
                <p className="text-xl font-bold">100+</p>
                <p className="text-sm text-muted-foreground">Live Products</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <LayoutGrid className="h-6 w-6 text-primary" />
              <div>
                <p className="text-xl font-bold">20+</p>
                <p className="text-sm text-muted-foreground">Categories</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Star className="h-6 w-6 text-primary" />
              <div>
                <p className="text-xl font-bold">4.5/5</p>
                <p className="text-sm text-muted-foreground">Avg. Rating</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Clock className="h-6 w-6 text-primary" />
              <div>
                <p className="text-xl font-bold">24/7</p>
                <p className="text-sm text-muted-foreground">API Access</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
