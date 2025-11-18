import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { formatCategoryLabel } from "@/lib/format";
import { Category } from "@/types";
import CategoryPillsMotion from "./CategoryPillsMotion";

interface CategoryListProps {
  currentCategory?: string;
  categories: Category[];
}

const CATEGORY_SECTION_ID = "category-section";

export default function CategoryList({
  currentCategory,
  categories,
}: CategoryListProps) {
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
          id={CATEGORY_SECTION_ID}
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
      <CategoryPillsMotion containerId={CATEGORY_SECTION_ID} />
    </section>
  );
}

