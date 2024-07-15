import Customer from "@/lib/models/Customer";
import Handmade from "@/lib/models/Handmade";
import { connectToDB } from "@/lib/mongoDB";

import { NextRequest, NextResponse } from "next/server";
import { format } from "date-fns";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();
    const handmade = await Handmade.find().sort({ createdAt: "desc" });
    const handmadeDetails = await Promise.all(
      handmade.map(async (hm) => {
        const customer = await Customer.findOne({
          clerkId: hm.customerClerkId,
        });
        return {
          _id: hm._id,
          clerkId: hm.customerClerkId,
          title: hm.title,
          image: hm.image,
          customer: customer.name,
          createdAt: format(hm.createdAt, "dd/mm/yyyy"),
        };
      })
    );

    return NextResponse.json(handmadeDetails, { headers: corsHeaders });
  } catch (err) {
    console.log("[Handmade_GET]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const { product, information, customer } = await req.json();
    console.log("[HandMade_POST]", {
      product: product,
      information: information,
      customer,
    });

    let customers = await Customer.findOne({ clerkId: customer.clerkId });

    if (!customers) {
      customers = new Customer(customers);
      await customers.save();
    }

    const handmade = new Handmade({
      customerClerkId: customer.clerkId,
      title: product.title,
      description: product.description,
      image: product.image,
      phoneNumber: information.phone,
      shippingAddress: information.address,
    });
    await handmade.save();

    return new NextResponse("Handmade created", { headers: corsHeaders });
  } catch (err) {
    console.log("[Handmade_POST]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
