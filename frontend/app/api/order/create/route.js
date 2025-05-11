import { getAuth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import User from '@/models/User';
import Product from '@/models/Product';
import { inngest } from '@/config/inngest';

export async function POST(req) {
  try {
    const { userId } = getAuth(req);
    const { address, items } = await req.json();

    if (!address || !items) {
      return NextResponse.json({
        success: false,
        message: 'Invalid data',
      });
    }

    // calculate amount using items
    let amount = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      amount += product.price * item.quantity;
    }

    await inngest.send({
      name: 'order/created',
      data: {
        userId,
        address,
        items,
        amount: amount + Math.floor(amount * 0.02),
        date: Date.now(),
      },
    });

    // clear user cart
    const user = await User.findById(userId);
    user.cartItems = {};
    await user.save();

    return NextResponse.json({
      success: true,
      message: 'Order created successfully',
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: 'Failed to create order',
    });
  }
}
