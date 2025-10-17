import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { dev } from '$app/environment';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return `${window.location.protocol}//${window.location.host}/`;
  } else if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}/`;
  } else if (process.env.VITE_VERCEL_URL) {
    return `https://${process.env.VITE_VERCEL_URL}/`;
  } else if (!dev) {
    return `http://localhost:${process.env.PORT ?? 4173}/`;
  }

  return `http://localhost:${process.env.PORT ?? 5173}/`;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, "child"> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, "children"> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };
