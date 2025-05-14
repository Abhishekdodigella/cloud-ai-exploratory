
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { v4 } from "uuid" // Import v4 from uuid package

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Export v4 from uuid
export { v4 }
