export const COLORS = [
  "bg-secondary",
  "bg-primary",
  "bg-green-500",
  "bg-amber-500",
  "bg-blue-500",
] as const;
export type Color = (typeof COLORS)[number];
