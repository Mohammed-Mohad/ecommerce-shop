"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { animate } from "motion";
import type { AnimationOptions, DOMKeyframesDefinition } from "motion";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { formatCategoryLabel } from "@/lib/format";
import { Category } from "@/types";

interface CategoryListProps {
  currentCategory?: string;
  categories: Category[];
}

type MotionKeyframes = DOMKeyframesDefinition;
type MotionOptions = AnimationOptions;

export default function CategoryList({
  currentCategory,
  categories,
}: CategoryListProps) {
  const pillsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = pillsRef.current;
    if (!container) return;

    const pills = Array.from(
      container.querySelectorAll<HTMLAnchorElement>("[data-pill]")
    );
    if (!pills.length) return;

    const animations = pills.map((pill, index) => {
      const keyframes: MotionKeyframes = {
        opacity: [0, 1],
        transform: ["translateY(8px)", "translateY(0px)"],
      };
      const options: MotionOptions = {
        duration: 0.35,
        delay: index * 0.05,
        ease: "easeOut",
      };
      return animate(pill, keyframes, options);
    });

    return () => animations.forEach((control) => control.cancel());
  }, [categories, currentCategory]);

  return (
    <section
      id="categories"
      className="scroll-mt-24 animate-in fade-in-0 slide-in-from-bottom-10 duration-700"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight">
          Browse by Category
        </h2>
        <p className="mt-2 text-lg text-muted-foreground">
          Find the perfect item by exploring our curated categories.
        </p>
      </div>
      <ScrollArea className="w-full whitespace-nowrap py-4">
        <div
          ref={pillsRef}
          className="mx-auto flex w-max justify-center gap-2 px-4"
        >
          <Button asChild variant={!currentCategory ? "default" : "outline"}>
            <Link href="/#categories" data-pill>
              All
            </Link>
          </Button>
          {categories.map((category) => {
            const slug = category.slug ?? category.name;
            const label = formatCategoryLabel(slug);
            const isActive = currentCategory === slug;
            return (
              <Button
                key={slug}
                asChild
                variant={isActive ? "default" : "outline"}
              >
                <Link
                  data-pill
                  href={`/?category=${encodeURIComponent(slug)}#categories`}
                >
                  {label}
                </Link>
              </Button>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" className="mt-2" />
      </ScrollArea>
    </section>
  );
}

