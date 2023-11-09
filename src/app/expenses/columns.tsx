"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export const ExpenseColumns: ColumnDef<any[]>[] = [
  {
    id: "select",
    header: ({ table }) => {
      return (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(checked) => {
            table.toggleAllPageRowsSelected(!!checked);
          }}
        />
      );
    },
    cell: ({ row }) => {
      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(checked) => {
            row.toggleSelected(!!checked);
          }}
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: ({ column }) => {
      return (
        <div
          className="flex cursor-pointer items-center justify-center gap-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          {column.getIsSorted() === "asc" ? (
            <ArrowDown size={16} />
          ) : (
            <ArrowUp size={16} />
          )}
        </div>
      );
    },
    accessorKey: "id",
  },
  {
    header: "Paid",
    accessorKey: "paid",
  },
  {
    header: "Expense",
    accessorKey: "expense",
  },
  {
    header: "Monthly Value",
    accessorKey: "monthlyValue",
  },
  {
    header: "Date",
    accessorKey: "date",
  },
  {
    header: "Installments",
    accessorKey: "installments",
  },
  {
    header: "Total Value",
    accessorKey: "totalValue",
  },
  {
    header: "Description",
    accessorKey: "description",
    cell: (row) => {
      const description = row.getValue() as string;
      return description.length > 20
        ? description.substring(0, 20) + "..."
        : description;
    },
  },
  {
    header: "User ID",
    accessorKey: "userId",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const expense = row.original as [];
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant={"ghost"}>Actions</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                console.log(expense);
              }}
            >
              Copy
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
