import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge tailwind classes safely
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Map a value from one range to another.
 * Great for syncing scroll progress to physics values.
 */
export function mapRange(
  value: number,
  min1: number,
  max1: number,
  min2: number,
  max2: number
) {
  return min2 + ((value - min1) * (max2 - min2)) / (max1 - min1);
}
