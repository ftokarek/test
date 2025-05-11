import Product from '@/models/Product';
import connectDB from '@/config/db';
import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import authSeller from '@/lib/authSeller';

export async function GET(request) {
  try {
    const { userId } = getAuth(request);

    const isSeller = await authSeller(userId);

    if (!isSeller) {
      return NextResponse.json({ success: false, message: 'Unauthorized' });
    }

    await connectDB();
    const products = await Product.find({});
    return NextResponse.json({ success: true, products });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
