import { getProductById } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
import FavoriteButton from "@/components/FavoriteButton";
import DeleteProductButton from "@/components/DeleteProductButton";
import { Button } from "@/components/ui/button";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  // The 'params' prop is a Promise in your Next.js version. Await it.
  const { id } = await params;
  const product = await getProductById(id).catch(() => notFound());

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="relative w-full h-96 mb-4 border rounded-lg">
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
          <div className="grid grid-cols-5 gap-2">
            {product.images.map((img, index) => (
              <div key={index} className="relative h-20 border rounded">
                <Image
                  src={img}
                  alt={`${product.title} image ${index + 1}`}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-xl text-muted-foreground">{product.brand}</p>
          <p className="text-3xl font-bold">${product.price}</p>
          <p className="text-yellow-500">Rating: {product.rating} / 5</p>
          <p className="text-lg">{product.description}</p>
          <p>
            <span className="font-semibold">Stock:</span> {product.stock}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <AddToCartButton product={product} />
            <FavoriteButton product={product} showLabel className="flex-1" />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild variant="outline">
              <Link href={`/product/${product.id}/edit`}>Edit Product</Link>
            </Button>
            <DeleteProductButton
              productId={product.id}
              productTitle={product.title}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
