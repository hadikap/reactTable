import { ReactNode } from "react";

export interface BasicTableColumn<T = any, K extends string = string> {
  name: keyof T | K;
  header?: string | ReactNode;
  width?: number | string;
  align?: "left" | "right" | "center";
  className?: string;
  sortable?: boolean;
  render?: (row: T, value: any) => ReactNode;
}

export interface UserType {
  id: number;
  name: string;
  email: string;
  age: number;
}
export interface BasicTableProps<T = any> {
  columns: Column<T>[];
  data: T[];
  title?: string;
  rowKey?: keyof T;
  className?: string;
  noDataTemplate?: ReactNode;
  loadingTemplate?: ReactNode;
  loadingState?: "idle" | "loading";
  isLoading?: boolean;
  pagination?: {
    page: number;
    totalPages: number;
    onNext: () => void;
    onPrev: () => void;
  };
}
