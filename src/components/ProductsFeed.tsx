"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { animate } from "motion";
import ProductCard from "@/components/ProductCard";
import {
  getProducts,
  getProductsByCategory,
  searchProducts,
} from "@/lib/api";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";

interface ProductsFeedProps {
  initialProducts: Product[];
  initialTotal: number;
  pageSize: number;
  query?: string;
  category?: string;
  initialError?: string | null;
}

export default function ProductsFeed({
  initialProducts,
  initialTotal,
  pageSize,
  query,
  category,
  initialError = null,
}: ProductsFeedProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [total, setTotal] = useState(initialTotal);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(initialError);

  useEffect(() => {
    setProducts(initialProducts);
    setTotal(initialTotal);
    setError(initialError);
  }, [initialProducts, initialTotal, initialError, query, category]);

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
  const loadingRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    if (!isLoading || products.length === 0) return;
    const container = loadingRef.current;
    if (!container) return;

    const controls = animate(
      container,
      { opacity: [0, 1], y: [8, 0] },
      { duration: 0.3, ease: "easeOut" }
    );

    return () => controls.cancel();
  }, [isLoading, products.length]);

  return (
    <div className="space-y-8">
      {products.length === 0 && !isLoading ? (
        <p className="text-muted-foreground">
          No products found. Try adjusting your search or filters.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {hasMore && <div ref={sentinelRef} className="h-4" />}

      {isLoading && products.length > 0 && (
        <div
          ref={loadingRef}
          className="grid grid-cols-2 gap-4 opacity-0 md:grid-cols-3 lg:grid-cols-4 md:gap-6"
        >
          {Array.from({ length: Math.min(pageSize, 4) }).map((_, idx) => (
            <ProductCardSkeleton key={idx} />
          ))}
        </div>
      )}

      {!isLoading && !hasMore && products.length > 0 && (
        <div className="mt-4 text-center text-muted-foreground">
          You&apos;ve reached the end of the list.
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
    </div>
  );
}
