import Collection from "@/lib/models/Collections";
import Product from "@/lib/models/Product";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }
    await connectToDB();
    const {
      title,
      description,
      media,
      category,
      collections,
      tags,
      sizes,
      colors,
      price,
    } = await req.json();

    if (!title || !description || !media || !category || !price) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const newProduct = await Product.create({
      title,
      description,
      media,
      category,
      collections,
      tags,
      sizes,
      colors,
      price,
    });
    await newProduct.save();

    if (collections) {
      for (const collectionId of collections) {
        const collection = await Collection.findById(collectionId);
        if (collection) {
          collection.products.push(newProduct._id);
          await collection.save();
        }
      }
    }

    return NextResponse.json(newProduct, { status: 200 });
  } catch (error) {
    console.log("[Products_POST] Error: ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();
    const products = await Product.find()
      .sort({ createAt: "desc" })
      .populate({ path: "collections", model: Collection });
    return NextResponse.json(products, { headers: corsHeaders });
  } catch (error) {
    console.log("[Products_GET] Error: ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
