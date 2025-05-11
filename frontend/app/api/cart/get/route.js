import { getAuth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import connectDB from '@/config/db';
import User from '@/models/User';

export async function GET(request) {
  try {
    const { userId } = getAuth(request);

    await connectDB();
    const user = await User.findById(userId);

    return NextResponse.json({ success: true, cartItems: user.cartItems });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
