"use client";

import { ColumnDef } from "@tanstack/react-table";
import Delete from "../custom ui/Delete";
import Link from "next/link";
import { formatCurrencyVND } from "../ToVnd";

export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <Link
        href={`/products/${row.original._id}`}
        className="hover:text-blue-1"
      >
        {row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "collections",
    header: "Collections",
    cell: ({ row }) =>
      row.original.collections.map((collection) => collection.title).join(", "),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => `${formatCurrencyVND(row.original.price)}`,
  },
  {
    accessorKey: "colors",
    header: "Color",
  },
  {
    accessorKey: "sizes",
    header: "Size",
    cell: ({ row }) => row.original.sizes.map((size) => size).join(", "),
  },
  {
    id: "actions",
    cell: ({ row }) => <Delete item="products" id={row.original._id} />,
  },
];
