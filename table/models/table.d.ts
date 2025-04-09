import { ReactNode } from "react";

export interface BasicTableColumn {
  render: (row: any, value: any) => React.ReactNode;
  name: string;
  header?: string | ReactNode;
  width?: number;
  align?: "left" | "right" | "center";
}

export interface BasicTableProps {
  columns: BasicTableColumn[];
  data: any[];
  title?: string;
  loadingState?:
    | "loading"
    | "sorting"
    | "loadingMore"
    | "error"
    | "idle"
    | "filtering";
  isLoading?: boolean;
  rowKey?: string;
  className?: string;
  noDataTemplate?: string | ReactNode;
  loadingTemplate?: string | ReactNode;
}
