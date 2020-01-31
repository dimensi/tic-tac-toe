type ClassValue = string | boolean
export function cn(...classes: ClassValue[]) {
  return classes.filter(Boolean).join(" ");
}


export const createMatrix = (size: number) => Array.from({ length: size ** 2 }, (_, i) => 0);

export const last = <T extends any>(arr: T[]) => arr[arr.length - 1]