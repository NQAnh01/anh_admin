import { ColumnDef } from "@tanstack/react-table";
import Delete from "../custom ui/Delete";
import Link from "next/link";

export const columns: ColumnDef<HandmadeType>[] = [
  {
    accessorKey: "Title",
    header: "Title",
    cell: ({ row }) => (
      <Link
        href={`/handmade/${row.original._id}`}
        className="hover:text-blue-1"
      >
        {row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => row.original.customer,
  },
  {
    accessorKey: "Ngày tạo",
    header: "Ngày tạo",
    cell: ({ row }) => row.original.createdAt,
  },
  {
    id: "actions",
    cell: ({ row }) => <Delete item="handmade" id={row.original._id} />,
  },
];
