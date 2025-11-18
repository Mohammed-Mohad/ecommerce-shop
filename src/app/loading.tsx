import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="flex flex-col">
      <section className="w-full bg-card">
        <div className="container mx-auto grid grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="space-y-6">
            <Skeleton className="h-6 w-40 rounded-full" />
            <Skeleton className="h-14 w-3/4" />
            <Skeleton className="h-4 w-full max-w-lg" />
            <div className="flex gap-4">
              <Skeleton className="h-12 w-40 rounded-2xl" />
              <Skeleton className="h-12 w-36 rounded-2xl" />
            </div>
            <Skeleton className="h-4 w-40" />
          </div>
          <Skeleton className="hidden h-[380px] w-full rounded-3xl lg:block" />
        </div>
        <div className="container mx-auto grid grid-cols-2 gap-6 border-t px-4 py-8 sm:px-6 md:grid-cols-4 lg:px-8">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="space-y-3 text-center">
              <Skeleton className="mx-auto h-6 w-6 rounded-full" />
              <Skeleton className="h-6 w-20 mx-auto" />
              <Skeleton className="h-4 w-32 mx-auto" />
            </div>
          ))}
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="mt-16 space-y-8">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Skeleton className="h-10 w-1/2" />
            <Skeleton className="h-6 w-3/4" />
          </div>
          <div className="flex justify-center gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-24 rounded-full" />
            ))}
          </div>
        </div>

        <div className="mt-16 space-y-8">
          <Skeleton className="h-10 w-64" />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
