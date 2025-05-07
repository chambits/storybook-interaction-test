import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageUrl(folder: string, imageName: string): string {
  if (imageName.startsWith("/")) {
    return imageName;
  }

  // For images in assets folder
  try {
    return new URL(`../assets/${folder}/${imageName}`, import.meta.url).href;
  } catch {
    return "/placeholder.svg";
  }
}
