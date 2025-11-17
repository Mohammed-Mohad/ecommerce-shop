"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Category, Product, ProductPayload } from "@/types";
import { createProduct, updateProduct } from "@/lib/api";
import { toast } from "sonner";

const productSchema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters"),
  price: z.coerce.number<string | number>().min(0, "Price must be positive"),
  stock: z.coerce.number<string | number>().int().min(0, "Stock must be positive"),
  brand: z.string().min(2, "Brand is required"),
  category: z.string().min(1, "Category is required"),
  thumbnail: z
    .union([z.string().url("Enter a valid URL"), z.literal("")])
    .optional(),
  images: z.string().optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;
type ProductFormInputs = z.input<typeof productSchema>;

interface ProductFormProps {
  categories: Category[];
  mode: "create" | "edit";
  product?: Product;
}

export default function ProductForm({
  categories,
  mode,
  product,
}: ProductFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues = useMemo<ProductFormInputs>(() => {
    if (product) {
      return {
        title: product.title,
        description: product.description,
        price: product.price,
        stock: product.stock,
        brand: product.brand,
        category: product.category,
        thumbnail: product.thumbnail || "",
        images: product.images?.join(", ") || "",
      };
    }

    return {
      title: "",
      description: "",
      price: 0,
      stock: 0,
      brand: "",
      category: categories[0]?.slug || "",
      thumbnail: "",
      images: "",
    };
  }, [categories, product]);

  const form = useForm<ProductFormInputs, undefined, ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues,
  });

  const onSubmit = async (values: ProductFormValues) => {
    setIsSubmitting(true);
    const payload: ProductPayload = {
      title: values.title,
      description: values.description,
      price: values.price,
      stock: values.stock,
      brand: values.brand,
      category: values.category,
      thumbnail: values.thumbnail || undefined,
      images: values.images
        ? values.images
            .split(",")
            .map((img) => img.trim())
            .filter(Boolean)
        : undefined,
    };

    try {
      if (mode === "create") {
        const created = await createProduct(payload);
        toast.success("Product created", {
          description: `"${created.title}" was created successfully.`,
        });
        router.push("/#categories");
        router.refresh();
      } else if (product) {
        const updated = await updateProduct(product.id, payload);
        toast.success("Product updated", {
          description: `"${updated.title}" was updated successfully.`,
        });
        router.push(`/product/${updated.id}`);
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to save product.";
      toast.error("Something went wrong", {
        description: message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <div className="rounded-3xl border border-border/70 bg-card/90 p-6 shadow-xl shadow-primary/10 backdrop-blur-sm md:p-8">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Product title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <FormControl>
                    <Input placeholder="Brand name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" min="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="mt-1 h-11 w-full rounded-2xl border border-input bg-white/85 px-4 text-sm text-foreground shadow-inner outline-none transition focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
                    >
                      {categories.map((cat) => (
                        <option key={cat.slug} value={cat.slug}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="thumbnail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thumbnail URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    rows={5}
                    placeholder="Tell shoppers what makes this item special"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gallery Images (comma separated URLs)</FormLabel>
                <FormControl>
                  <Textarea
                    rows={3}
                    placeholder="https://image1.jpg, https://image2.jpg"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? "Saving..."
                : mode === "create"
                ? "Create Product"
                : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </Form>
  );
}
