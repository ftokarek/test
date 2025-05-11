import { getAuth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import connectDB from '@/config/db';
import Address from '@/models/Address';

export async function POST(req) {
  try {
    const { userId } = await getAuth(req);
    const { address } = await req.json();

    await connectDB();

    const newAddress = Address.create({
      userId,
      ...address,
    });

    return NextResponse.json({
      success: true,
      message: 'Address added successfully',
      newAddress,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to add address',
    });
  }
}
