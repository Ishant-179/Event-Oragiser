// src/lib/utils.js
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * A utility function to conditionally join Tailwind CSS classes.
 * It combines `clsx` for conditional class joining and `tailwind-merge` for resolving Tailwind conflicts.
 * @param {...string} inputs - Class names or conditional class objects.
 * @returns {string} The merged class string.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// You will need to install these packages:
// npm install clsx tailwind-merge
