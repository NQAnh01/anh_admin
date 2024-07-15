import Customer from "@/lib/models/Customer";
import Order from "@/lib/models/Order";
import Product from "@/lib/models/Product";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { orderId: String } }
) => {
  try {
    await connectToDB();
    const orderDetails = await Order.findById(params.orderId).populate({
      path: "products.product",
      model: Product,
    });

    if (!orderDetails) {
      return new NextResponse(JSON.stringify({ message: "Order Not Found" }), {
        status: 404,
      });
    }

    const customer = await Customer.findOne({
      clerkId: orderDetails.customerClerkId,
    });

    return NextResponse.json({ orderDetails, customer }, { status: 200 });
  } catch (err) {
    console.log("[orderId_GET]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: { orderId: string } }
) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    await connectToDB(); // Kết nối đến cơ sở dữ liệu MongoDB

    const { status } = await req.json();

    // Tìm và cập nhật đơn hàng
    const updatedOrder = await Order.findByIdAndUpdate(
      params.orderId,
      { status },
      { new: true } // Trả về bản ghi đã cập nhật
    );

    if (!updatedOrder) {
      return new NextResponse("Order not found", { status: 404 });
    }

    return NextResponse.json(updatedOrder, { status: 200 });
  } catch (error) {
    console.error("Failed to update order:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { orderId: string } }
) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    await connectToDB(); // Kết nối đến cơ sở dữ liệu MongoDB

    const deletedOrder = await Order.deleteOne({ _id: params.orderId });

    if (deletedOrder.deletedCount === 0) {
      // Không tìm thấy đơn hàng để xóa
      return new NextResponse("Order not found", { status: 404 });
    }

    console.log("Order deleted:", deletedOrder);
    return new NextResponse("Order deleted", { status: 200 });
  } catch (error) {
    console.error("Delete order error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
