import connectDB from "@/config/db";
import Product from "@/models/Product"; // Upewnij się, że ścieżka jest poprawna
import { Types } from "mongoose";
import { NextResponse } from 'next/server';



export async function POST(req) {
  try {
    const { product_id } = await req.json();
    const publicKey = await getProductPublicKey(product_id);

    return NextResponse.json({ publicKey });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}


export async function getProductPublicKey(product_id) {
  await connectDB();

  if (!Types.ObjectId.isValid(product_id)) {
    throw new Error("Invalid product ID format");
  }

  const product = await Product.findById(product_id).select("publicKey");

  if (!product) {
    throw new Error("Product not found");
  }

  return product.publicKey;
}
