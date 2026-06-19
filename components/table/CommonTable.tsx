"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SpinnerCustom } from "../Spinner";

interface CommonTableProps {
  columns: {
    header: string;
    accessorKey: string;
    cell?: (row: any) => React.ReactNode;
  }[];
  data: any[];
  loading?: boolean;
}

export function CommonTable({ columns, data, loading }: CommonTableProps) {

  if(loading){
    <SpinnerCustom/>
  }
  return (
    <div className="overflow-hidden rounded-md border border-gray-600">
      <Table>
        {/* HEADER */}
        <TableHeader className="bg-[#2dc67b]">
          <TableRow>
            {columns.map((col, i) => (
              <TableHead key={i} className="text-white font-semibold">
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        {/* BODY */}
        <TableBody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                className="text-gray-300 border-gray-600"
              >
                {columns.map((col, colIndex) => (
                  <TableCell key={colIndex}>
                    {col.cell
                      ? col.cell(row)
                      : row[col.accessorKey]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center text-white">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}