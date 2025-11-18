"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function ProductCardSkeleton() {
  return (
    <div className="flex flex-col rounded-3xl border border-border/70 bg-card/70 p-4 shadow-sm">
      <Skeleton className="aspect-square rounded-2xl" />
      <div className="mt-4 space-y-3">
        <Skeleton className="h-4 w-24 rounded-full" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-5 w-1/2" />
      </div>
      <Skeleton className="mt-6 h-10 w-full rounded-2xl" />
    </div>
  );
}

