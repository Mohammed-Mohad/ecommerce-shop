export function formatCategoryLabel(category?: string | null) {
  if (!category || typeof category !== "string") {
    return "";
  }

  return category
    .split("-")
    .map((segment) =>
      segment.length > 0
        ? segment[0].toUpperCase() + segment.slice(1)
        : segment
    )
    .join(" ");
}
