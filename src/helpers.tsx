type ClassValue = string | boolean
export function cn(...classes: ClassValue[]) {
  return classes.filter(Boolean).join(" ");
}

export const last = <T extends any>(arr: T[]) => arr[arr.length - 1]