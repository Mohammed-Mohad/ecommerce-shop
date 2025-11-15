import { getCategories } from "@/lib/api";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { formatCategoryLabel } from "@/lib/format";

interface CategoryListProps {
  currentCategory?: string;
}

export default async function CategoryList({
  currentCategory,
}: CategoryListProps) {
  const categories = await getCategories();

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Categories</h2>
      <div className="flex flex-wrap gap-2">
        {/* "All" category link */}
        <Link
          href="/"
          className={cn(
            "px-4 py-2 border rounded-full text-sm font-medium transition-colors",
            !currentCategory
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "hover:bg-accent hover:text-accent-foreground"
          )}
        >
          All
        </Link>

        {/* Mapped category links */}
        {categories.map((category) => {
          const slug = category.slug ?? category.name;
          const label = category.name ?? formatCategoryLabel(category.slug);
          const isActive = currentCategory === slug;
          return (
            <Link
              key={slug}
              href={`/?category=${encodeURIComponent(slug)}`}
              className={cn(
                "px-4 py-2 border rounded-full text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
