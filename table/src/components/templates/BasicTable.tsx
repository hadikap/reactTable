import { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@heroui/react";

import { classNameMerge } from "../../utils/classNameMerge";
import "../../styles/table.css";
import { BasicTableProps } from "../../models/table";

export const BasicTable = ({
  columns,
  data,
  title,
  rowKey = "id",
  className,
  noDataTemplate = "داده‌ای وجود ندارد",
  loadingTemplate = "در حال بارگذاری...",
  loadingState,
  isLoading,
  pagination,
}: BasicTableProps<any>) => {
  const [sort, setSort] = useState({ column: "", direction: "asc" });

  const handleSort = (column: any) => {
    if (!column.sortable) return;
    const isAsc = sort.column === column.name && sort.direction === "asc";
    setSort({ column: column.name, direction: isAsc ? "desc" : "asc" });
  };

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-white/20">
      <Table
        aria-label={title}
        className={classNameMerge("table text-sm text-center", className)}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={String(column.name)}
              onClick={() => handleSort(column)}
              className={classNameMerge(
                "thead th cursor-pointer select-none px-4 py-3 text-start font-semibold",
                column.align ? `text-${column.align}` : "",
                column.sortable ? "hover:text-blue-400" : "",
                column.className
              )}
              style={{ width: column.width }}
            >
              {column.header}
              {column.sortable && sort.column === column.name && (
                <span className="ml-1">
                  {sort.direction === "asc" ? "↑" : "↓"}
                </span>
              )}
            </TableColumn>
          )}
        </TableHeader>

        <TableBody
          items={data}
          emptyContent={noDataTemplate}
          loadingContent={loadingTemplate}
          loadingState={loadingState}
          isLoading={isLoading}
        >
          {(item) => (
            <TableRow key={String(item[rowKey])}>
              {(columnKey) => {
                const column = columns.find((col) => col.name === columnKey);
                const value = getKeyValue(item, columnKey);
                return (
                  <TableCell className="thead px-4 py-3">
                    {column?.render ? column.render(item, value) : value}
                  </TableCell>
                );
              }}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {pagination && (
        <div className="flex items-center justify-end gap-2 px-4 py-3 text-xs">
          صفحه {pagination.page} از {pagination.totalPages}
          <button
            disabled={pagination.page === 1}
            onClick={pagination.onPrev}
            className="rounded-md bg-gray-700 px-2 py-1 disabled:opacity-40"
          >
            قبلی
          </button>
          <button
            disabled={pagination.page === pagination.totalPages}
            onClick={pagination.onNext}
            className="rounded-md bg-gray-700 px-2 py-1 disabled:opacity-40"
          >
            بعدی
          </button>
        </div>
      )}
    </div>
  );
};
