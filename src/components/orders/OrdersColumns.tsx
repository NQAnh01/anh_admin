import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useEffect, useState } from "react";
import Delete from "../custom ui/Delete";

// // Component hoặc Hook phải bắt đầu bằng chữ hoa
// const OrderStatusCell = ({ row, updateOrderStatus }: any) => {
//   const [status, setStatus] = useState(row.values.status);

//   const handleStatusChange = async (
//     e: React.ChangeEvent<HTMLSelectElement>
//   ) => {
//     const newStatus = e.target.value;
//     setStatus(newStatus);

//     try {
//       const response = await fetch(`/api/orders/${row.values._id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ status: newStatus }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to update status");
//       }

//       // Gọi hàm callback để thông báo cập nhật trạng thái lên cấp cha
//       // updateOrderStatus(row.index, newStatus);
//     } catch (error) {
//       console.error("Error updating status:", error);
//       // Điều hướng hoặc hiển thị thông báo lỗi tại đây
//     }
//   };

//   // Sử dụng useEffect để cập nhật lại trạng thái khi row.values.status thay đổi
//   useEffect(() => {
//     setStatus(row.values.status);
//   }, [row.values.status]);

//   return (
//     <div className="flex items-center">
//       <select value={status} onChange={handleStatusChange}>
//         <option value="Đặt hàng">Đặt hàng</option>
//         <option value="Vận chuyển">Vận chuyển</option>
//         <option value="Đã nhận">Đã nhận</option>
//       </select>
//     </div>
//   );
// };

export const columns: ColumnDef<OrderColumnType>[] = [
  {
    accessorKey: "_id",
    header: "Order",
    cell: ({ row }) => (
      <Link href={`/orders/${row.original._id}`} className="hover:text-red-1">
        {row.original._id}
      </Link>
    ),
  },
  {
    accessorKey: "customer",
    header: "Customer",
  },
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "total",
    header: "Total (.000d)",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }: any) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [status, setStatus] = useState(row.original.status);

      const handleStatusChange = async (
        e: React.ChangeEvent<HTMLSelectElement>
      ) => {
        const newStatus = e.target.value;
        setStatus(newStatus);

        try {
          const response = await fetch(`/api/orders/${row.original._id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: newStatus }),
          });

          if (!response.ok) {
            throw new Error("Failed to update status");
          }
        } catch (error) {
          console.error("Error updating status:", error);
          // Điều hướng hoặc hiển thị thông báo lỗi tại đây
        }
      };

      return (
        <div className="flex items-center">
          <select value={status} onChange={handleStatusChange}>
            <option value="Đặt hàng">Đặt hàng</option>
            <option value="Vận chuyển">Vận chuyển</option>
            <option value="Đã nhận">Đã nhận</option>
          </select>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <Delete item="orders" id={row.original._id} />,
  },
];
