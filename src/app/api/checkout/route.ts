// pages/api/checkout.ts

import Customer from "@/lib/models/Customer";
import Order from "@/lib/models/Order";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const { cartItems, information, customer } = await req.json();

    // Tính toán tổng số tiền
    const total = cartItems.reduce(
      (acc: number, cartItem: { item: { price: number }; quantity: number }) =>
        acc + cartItem.item.price * cartItem.quantity,
      0
    );

    const orderItems = cartItems.map((item: any) => {
      return {
        product: item.item._id,
        quantity: item.quantity,
        color: item.color,
      };
    });

    await connectToDB();

    const newOrder = new Order({
      customerClerkId: customer.clerkId,
      products: orderItems,
      shippingAddress: information.address,
      total: total,
    });
    await newOrder.save();

    let customers = await Customer.findOne({ clerkId: customer.clerkId });

    if (customers) {
      customers.orders.push(newOrder._id);
    } else {
      customers = new Customer({
        ...customer,
        orders: [newOrder._id],
      });
    }

    await customers.save();

    return new NextResponse("Order created", { headers: corsHeaders });
  } catch (error) {
    console.log("[Checkout_post] Error: ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
