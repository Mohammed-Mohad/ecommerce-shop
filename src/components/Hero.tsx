"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { animate } from "motion";
import type { AnimationOptions, DOMKeyframesDefinition } from "motion";
import { Button } from "./ui/button";
import {
  ArrowRight,
  ChevronDown,
  Star,
  Package,
  LayoutGrid,
  Store,
} from "lucide-react";

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

interface HeroStats {
  totalProducts: number;
  totalCategories: number;
  avgRating: number;
  brandCount: number;
}

interface HeroProps {
  stats: HeroStats;
}

type MotionKeyframes = DOMKeyframesDefinition;
type MotionOptions = AnimationOptions;

export default function Hero({ stats }: HeroProps) {
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const heroTargets = hero.querySelectorAll<HTMLElement>("[data-hero-animate]");
    heroTargets.forEach((element, index) => {
      const keyframes: MotionKeyframes = {
        opacity: [0, 1],
        transform: ["translateY(14px)", "translateY(0px)"],
      };
      const options: MotionOptions = {
        duration: 0.45,
        delay: index * 0.1,
        ease: "easeOut",
      };
      animate(element, keyframes, options);
    });

    const featured = hero.querySelector<HTMLElement>("[data-featured-card]");
    if (featured) {
      const keyframes: MotionKeyframes = {
        opacity: [0, 1],
        transform: ["scale(0.95)", "scale(1)"],
      };
      animate(featured, keyframes, { duration: 0.6, delay: 0.2, ease: "easeOut" });
    }

    const statCards = hero.querySelectorAll<HTMLElement>("[data-stat-card]");
    statCards.forEach((card, index) => {
      const keyframes: MotionKeyframes = {
        opacity: [0, 1],
        transform: ["translateY(10px)", "translateY(0px)"],
      };
      const options: MotionOptions = {
        duration: 0.4,
        delay: 0.3 + index * 0.08,
        ease: "easeOut",
      };
      animate(card, keyframes, options);
    });
  }, []);
  const statsItems = [
    {
      label: "Live products",
      value: stats.totalProducts.toLocaleString(),
      Icon: Package,
    },
    {
      label: "Categories",
      value: stats.totalCategories.toString(),
      Icon: LayoutGrid,
    },
    {
      label: "Avg. rating",
      value: stats.avgRating.toFixed(1),
      Icon: Star,
    },
    {
      label: "Brands represented",
      value: stats.brandCount.toString(),
      Icon: Store,
    },
  ];

  return (
    <section ref={heroRef} className="w-full bg-card">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.1),rgba(255,255,255,0))]"></div>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left Column: Text Content */}
          <div className="text-center lg:text-left">
            <p className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
              Curated Marketplace
            </p>
            <h1
              className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl opacity-0"
              data-hero-animate
            >
              Discover your next favorite product.
            </h1>
            <p
              className="mt-6 text-lg text-muted-foreground opacity-0"
              data-hero-animate
            >
              Browse thousands of products, from beauty essentials to tech
              must-haves, powered by a real-world API simulation.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
              <Button asChild size="lg" className="opacity-0" role="button">
                <Link href="/favorites" data-hero-animate>
                  Browse favorites <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="secondary"
                size="lg"
                className="opacity-0"
                role="button"
              >
                <Link href="/products/new" data-hero-animate>
                  Add a product
                </Link>
              </Button>
            </div>
            <div className="mt-4 flex items-center justify-center gap-3 text-sm text-muted-foreground lg:justify-start">
              <span className="h-px w-12 bg-border" />
              <Link
                href="/#categories"
                className="inline-flex items-center gap-1 font-medium text-primary hover:text-primary/80"
              >
                Scroll to categories
                <ChevronDown className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Featured Product */}
          <div className="flex justify-center lg:justify-end">
            <Link
              href={`/product/${featuredProduct.id}`}
              className="group block opacity-0"
              data-featured-card
            >
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
          <div
            className="grid grid-cols-2 gap-8 text-center md:grid-cols-4"
          >
            {statsItems.map(({ label, value, Icon }) => (
              <div
                key={label}
                data-stat-card
                className="flex flex-col items-center gap-2 opacity-0"
              >
                <Icon className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-xl font-bold">{value}</p>
                  <p className="text-sm text-muted-foreground">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
