// lib/name-control.ts (add this helper)
export function toTitleCase(str: string): string {
  return str
    .split("-") // Split by hyphens
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" "); // Join with spaces
}
