import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 88文字でトリミングして...を追加する
export function trimString(str: string, length: number) {
  return str.length > length ? str.substring(0, length) + '...' : str;
}
