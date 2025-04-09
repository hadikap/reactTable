import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@heroui/react";
import { BasicTableProps } from "../../models/table";
import { classNameMerge } from "../../utils/classNameMerge";

export const BasicTable = (props: BasicTableProps) => {
  const rowKey = props.rowKey || "id";
  return (
    <Table aria-label={props.title} className={classNameMerge("", props.className)}>
      <TableHeader columns={props.columns}>
        {(column) => (
          <TableColumn key={column.name}>{column.header}</TableColumn>
        )}
      </TableHeader>
      <TableBody
        items={props.data}
        emptyContent={props.noDataTemplate}
        loadingContent={props.loadingTemplate}
        loadingState={props.loadingState}
        isLoading={props.isLoading}
      >
        {(item) => (
          <TableRow key={item[rowKey]}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
