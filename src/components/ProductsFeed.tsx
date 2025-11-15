"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import {
  getProducts,
  getProductsByCategory,
  searchProducts,
} from "@/lib/api";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";

interface ProductsFeedProps {
  initialProducts: Product[];
  initialTotal: number;
  pageSize: number;
  query?: string;
  category?: string;
}

export default function ProductsFeed({
  initialProducts,
  initialTotal,
  pageSize,
  query,
  category,
}: ProductsFeedProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [total, setTotal] = useState(initialTotal);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setProducts(initialProducts);
    setTotal(initialTotal);
    setError(null);
  }, [initialProducts, initialTotal, query, category]);

  const loadedCount = products.length;
  const hasMore = loadedCount < total;

  const fetchMore = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    setError(null);

    try {
      const skip = loadedCount;
      let response;

      if (query) {
        response = await searchProducts(query, pageSize, skip);
      } else if (category) {
        response = await getProductsByCategory(category, pageSize, skip);
      } else {
        response = await getProducts(pageSize, skip);
      }

      setProducts((prev) => [...prev, ...response.products]);
      setTotal(response.total);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load more products.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [category, hasMore, isLoading, loadedCount, pageSize, query]);

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasMore) return;
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          fetchMore();
        }
      },
      {
        rootMargin: "200px",
      }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [fetchMore, hasMore]);

  const content = useMemo(() => {
    if (products.length === 0 && !isLoading) {
      return (
        <p className="text-muted-foreground">
          No products found. Try adjusting your search or filters.
        </p>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  }, [isLoading, products]);

  return (
    <div className="space-y-4">
      {content}
      <div ref={sentinelRef} />
      {isLoading && (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Loading more products…</span>
        </div>
      )}
      {error && (
        <div className="flex flex-wrap items-center gap-2 rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
          <span>{error}</span>
          <Button size="sm" variant="outline" onClick={fetchMore}>
            Try again
          </Button>
        </div>
      )}
      {!hasMore && products.length > 0 && (
        <p className="text-sm text-muted-foreground">
          You&apos;ve reached the end of the list.
        </p>
      )}
    </div>
  );
}
