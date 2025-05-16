import { getAuth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import connectDB from '@/config/db';
import User from '@/models/User';

export async function POST(req) {
  try {
    const body = await req.json();
    const { userId } = body;
    await connectDB();
    const user = await User.findById( userId );
    const ownedProducts = user.ownedProducts;

    return NextResponse.json({
      success: true,
      ownedProducts,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to get prompts',
    });
  }
}
