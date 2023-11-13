"use client";

import axios from "axios";
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

import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Check,
  CheckSquare,
  MoreHorizontal,
  X,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Expense } from "@/types/expense";

export const ExpenseColumns: ColumnDef<any[]>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => {
  //     return (
  //       <Checkbox
  //         checked={table.getIsAllPageRowsSelected()}
  //         onCheckedChange={(checked) => {
  //           table.toggleAllPageRowsSelected(!!checked);
  //         }}
  //       />
  //     );
  //   },
  //   cell: ({ row }) => {
  //     return (
  //       <Checkbox
  //         checked={row.getIsSelected()}
  //         onCheckedChange={(checked) => {
  //           row.toggleSelected(!!checked);
  //         }}
  //       />
  //     );
  //   },
  //   enableSorting: false,
  //   enableHiding: false,
  // },
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
    cell: ({ row }) => {
      const id = row.getValue<number>("id");
      return (
        <span className="flex items-center justify-center font-extrabold">
          {id}
        </span>
      );
    },
  },
  {
    header: "Paid",
    accessorKey: "paid",
    cell: ({ row }) => {
      const paid = row.getValue<boolean>("paid");
      if (paid) {
        return <Check size={16} className="font-extrabold text-green-500" />;
      } else {
        return <X size={16} className="font-extrabold text-red-500" />;
      }
    },
  },
  {
    header: "Expense",
    accessorKey: "expense",
  },
  {
    header: "Total Value",
    accessorKey: "totalValue",
    cell: ({ row }) => {
      const totalValue = row.getValue<number>("totalValue");
      // formata o valor para o padrão brasileiro
      const formattedValue = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(totalValue);

      return <span>{formattedValue}</span>;
    },
  },
  {
    header: "Installments",
    accessorKey: "installments",
    cell: ({ row }) => {
      const installments = row.getValue<number>("installments");
      return <span>{installments}x</span>;
    },
  },
  {
    header: "Monthly Value",
    accessorKey: "monthlyValue",
    cell: ({ row }) => {
      const monthlyValue = row.getValue<number>("monthlyValue");
      // formata o valor para o padrão brasileiro
      const formattedValue = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(monthlyValue);

      return <span>{formattedValue}</span>;
    },
  },
  {
    header: "Description",
    accessorKey: "description",
    cell: (row) => {
      const description = row.getValue() as string;

      if (description.length > 0) {
        return description.length > 20
          ? description.substring(0, 20) + "..."
          : description;
      } else {
        return <span className="text-gray-400">-</span>;
      }
    },
  },
  {
    header: "Date",
    accessorKey: "date",
    cell: ({ row }) => {
      const dateString = row.getValue<Date>("date");
      const date = new Date(dateString);

      const formatOptions = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      } as Intl.DateTimeFormatOptions;

      const brFormat = new Intl.DateTimeFormat("pt-BR", formatOptions);
      const formatedDate = brFormat.format(date);

      return <span>{formatedDate}</span>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const expense: any = row.original;

      const handleDelete = async () => {
        await axios.delete(`http://localhost:3333/expense/${expense.id}`);

        window.location.reload();
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant={"ghost"}>
              <MoreHorizontal size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
            <DropdownMenuItem>Copy</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
