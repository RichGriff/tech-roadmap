import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const cleanDescription = (val: string) => {
  const regex = /(<([^>]+)>)/ig;
  return val.replace(regex, '');
}
