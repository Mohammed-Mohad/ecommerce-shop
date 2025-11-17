export function formatCategoryLabel(category: string): string {
  return category.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}
