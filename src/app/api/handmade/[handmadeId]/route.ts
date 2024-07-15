import Customer from "@/lib/models/Customer";
import Handmade from "@/lib/models/Handmade";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { handmadeId: String } }
) => {
  try {
    await connectToDB();

    const handmadeDetails = await Handmade.findById(params.handmadeId);

    if (!handmadeDetails) {
      return new NextResponse(
        JSON.stringify({ message: "Order handmade Not Found" }),
        {
          status: 404,
        }
      );
    }

    const customer = await Customer.findOne({
      clerkId: handmadeDetails.customerClerkId,
    });

    return NextResponse.json({ handmadeDetails, customer }, { status: 200 });
  } catch (err) {
    console.log("[orderId_GET]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { handmadeId: string } }
) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    await connectToDB(); // Kết nối đến cơ sở dữ liệu MongoDB

    const deletedHandmade = await Handmade.deleteOne({
      _id: params.handmadeId,
    });

    if (deletedHandmade.deletedCount === 0) {
      // Không tìm thấy đơn hàng để xóa
      return new NextResponse("Order not found", { status: 404 });
    }

    console.log("Order deleted:", deletedHandmade);
    return new NextResponse("Order deleted", { status: 200 });
  } catch (error) {
    console.error("Delete order error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
