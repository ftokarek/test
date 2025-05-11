import Product from '@/models/Product';
import connectDB from '@/config/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find({});
    return NextResponse.json({ success: true, products });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
