import { getProductById } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
import FavoriteButton from "@/components/FavoriteButton";
import DeleteProductButton from "@/components/DeleteProductButton";
import { Button } from "@/components/ui/button";
import { formatCategoryLabel, formatPrice } from "@/lib/format";
import { Star, Edit } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id).catch(() => notFound());
  const discount = product.discountPercentage;
  const discountedPrice =
    discount > 0
      ? Math.max(product.price - (product.price * discount) / 100, 0)
      : product.price;

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-8 md:grid-cols-2 lg:gap-16">
        {/* Image Gallery Section */}
        <div>
          <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-xl border bg-muted/50 shadow-sm">
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              priority
              quality={100}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain transition-transform duration-300 group-hover:scale-105"
            />
            {discount > 0 && (
              <div className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-sm font-semibold text-primary-foreground shadow-lg">
                {discount.toFixed(0)}% OFF
              </div>
            )}
          </div>
          <div className="grid grid-cols-5 gap-3">
            {product.images.slice(0, 5).map((img, index) => (
              <div
                key={index}
                className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg border transition-all hover:border-primary hover:ring-2 hover:ring-primary/75"
              >
                <Image
                  src={img}
                  alt={`${product.title} image ${index + 1}`}
                  fill
                  quality={80}
                  sizes="(max-width: 768px) 20vw, 10vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="flex flex-col space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium uppercase tracking-wider text-primary">
                {formatCategoryLabel(product.category)}
              </p>
              <div className="flex items-center gap-2">
                <Button asChild variant="ghost" size="sm" className="text-muted-foreground">
                  <Link href={`/product/${product.id}/edit`}>
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </Link>
                </Button>
                <DeleteProductButton
                  productId={product.id}
                  productTitle={product.title}
                />
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
              {product.title}
            </h1>
            <p className="text-lg text-muted-foreground">{product.brand}</p>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <div className="flex items-center gap-1.5">
              <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
              <span className="text-base font-bold text-foreground">
                {product.rating.toFixed(1)}
              </span>
              <span className="text-sm text-muted-foreground">
                ({product.reviews.length} reviews)
              </span>
            </div>
            <span className="hidden text-muted-foreground sm:inline">·</span>
            <span className="text-sm font-medium text-green-600">
              {product.stock} in stock
            </span>
          </div>

          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
            <p className="text-4xl font-bold text-foreground">
              {formatPrice(discountedPrice)}
            </p>
            {discount > 0 && (
              <p className="text-xl text-muted-foreground/80 line-through">
                {formatPrice(product.price)}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-3 pt-4 sm:flex-row">
            <AddToCartButton product={product} />
            <FavoriteButton product={product} />
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="description" className="mt-16 w-full">
        <TabsList className="mb-6 grid w-full max-w-md grid-cols-3 border-b-2 border-transparent">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="reviews">
            Reviews ({product.reviews.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="prose prose-invert max-w-none prose-p:text-muted-foreground">
          <h3>About this product</h3>
          <p>{product.description}</p>
          <div className="not-prose mt-6 flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border bg-muted/50 px-3 py-1 text-xs font-medium uppercase tracking-wide text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="details">
          <div className="grid max-w-4xl gap-x-12 gap-y-8 md:grid-cols-2">
            <InfoCard
              title="Product Information"
              items={[
                { label: "SKU", value: product.sku },
                { label: "Weight", value: `${product.weight} kg` },
                {
                  label: "Dimensions",
                  value: `${product.dimensions.width}cm × ${product.dimensions.height}cm × ${product.dimensions.depth}cm`,
                },
                {
                  label: "Minimum order",
                  value: `${product.minimumOrderQuantity} units`,
                },
              ]}
            />
            <InfoCard
              title="Shipping & Returns"
              items={[
                {
                  label: "Shipping",
                  value: product.shippingInformation,
                },
                {
                  label: "Warranty",
                  value: product.warrantyInformation,
                },
                {
                  label: "Return Policy",
                  value: product.returnPolicy,
                },
              ]}
            />
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="max-w-4xl">
          <h3 className="mb-6 text-2xl font-semibold">Customer Reviews</h3>
          {product.reviews.length === 0 ? (
            <div className="rounded-lg border border-dashed bg-muted/30 py-12 text-center">
              <p className="font-medium text-muted-foreground">
                No reviews yet.
              </p>
              <p className="text-sm text-muted-foreground/80">
                Be the first to share your experience.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {product.reviews.map((review, index) => (
                <div
                  key={`${review.reviewerEmail}-${index}`}
                  className="rounded-lg border bg-muted/30 p-5"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="font-semibold text-foreground">
                        {review.reviewerName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(review.date)}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? "fill-amber-400 text-amber-400"
                              : "fill-muted stroke-muted-foreground/60"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/90">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function InfoCard({
  title,
  items,
}: {
  title: string;
  items: { label: string; value: string | undefined }[];
}) {
  return (
    <div className="flex flex-col">
      <h3 className="mb-4 border-b pb-2 text-lg font-semibold">{title}</h3>
      <dl className="space-y-3">
        {items.map(
          (item) =>
            item.value && (
              <div key={item.label} className="grid grid-cols-2 gap-4">
                <dt className="text-sm text-muted-foreground">{item.label}</dt>
                <dd className="text-sm font-medium text-foreground">
                  {item.value}
                </dd>
              </div>
            )
        )}
      </dl>
    </div>
  );
}

function formatDate(dateString: string) {
  try {
    return new Date(dateString).toLocaleDateString();
  } catch {
    return dateString;
  }
}
