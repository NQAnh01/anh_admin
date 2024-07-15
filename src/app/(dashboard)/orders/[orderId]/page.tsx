import { DataTable } from "@/components/custom ui/DataTable";
import { columns } from "@/components/ordersItem/OrdersItemColumns";

const OrderDetails = async ({ params }: { params: { orderId: string } }) => {
  const res = await fetch(
    `${process.env.ADMIN_DASHBOARD_URL}/api/orders/${params.orderId}`
  );
  const { orderDetails, customer } = await res.json();
  return (
    <div className="flex flex-col p-10 gap-5">
      {/* <h1>Orders ID</h1> */}
      <p className="text-base-bold">
        Order ID: <span className="text-base-medium">{orderDetails._id}</span>
      </p>
      <p className="text-base-bold">
        Customer name: <span className="text-base-medium">{customer.name}</span>
      </p>
      <p className="text-base-bold">
        Shipping address:{" "}
        <span className="text-base-medium">{orderDetails.shippingAddress}</span>
      </p>
      <p className="text-base-bold">
        Total Paid:{" "}
        <span className="text-base-medium">${orderDetails.total}</span>
      </p>
      <DataTable
        columns={columns}
        data={orderDetails.products}
        searchKey="product"
      />
    </div>
  );
};

export default OrderDetails;
