import clsx, { ClassValue } from "clsx";

export function classNameMerge(...classes: ClassValue[]): string {
  return clsx(classes);
}
