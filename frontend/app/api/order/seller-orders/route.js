import { getAuth } from '@clerk/nextjs/server';
import connectDB from '@/config/db';
import Order from '@/models/Order';
import Address from '@/models/Address';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';
import authSeller from '@/lib/authSeller';

export async function GET(req) {
  try {
    const { userId } = getAuth(req);
    const isSeller = await authSeller(userId);

    if (!isSeller) {
      return NextResponse.json({ success: false, message: 'Unauthorized' });
    }

    await connectDB();

    const orders = await Order.find({});
    const addresses = await Address.find();
    const products = await Product.find();

    const processedOrders = orders.map((order) => {
      const orderData = order.toObject();

      const address = addresses.find((a) => a._id.toString() === order.address);
      if (address) orderData.address = address;

      if (orderData.items && orderData.items.length > 0) {
        orderData.items = orderData.items.map((item) => {
          const product = products.find(
            (p) => p._id.toString() === item.product
          );
          if (product) item.product = product;
          return item;
        });
      }

      return orderData;
    });

    return NextResponse.json({ success: true, orders: processedOrders });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}
