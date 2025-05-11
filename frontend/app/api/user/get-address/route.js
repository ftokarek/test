import { getAuth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import connectDB from '@/config/db';
import Address from '@/models/Address';

export async function GET(req) {
  try {
    const { userId } = getAuth(req);
    await connectDB();
    const addresses = await Address.find({ userId });

    return NextResponse.json({
      success: true,
      addresses,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to get addresses',
    });
  }
}
