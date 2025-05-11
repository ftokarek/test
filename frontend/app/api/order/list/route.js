import { getAuth } from '@clerk/nextjs/server';
import connectDB from '@/config/db';
import Order from '@/models/Order';
import Address from '@/models/Address';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const { userId } = getAuth(req);
    await connectDB();

    // Pobierz zamówienia
    const orders = await Order.find({ user: userId });

    // Pobierz wszystkie adresy i produkty
    const addresses = await Address.find();
    const products = await Product.find();

    // Przygotuj dane do zwrócenia - zamień ID na pełne obiekty
    const processedOrders = orders.map((order) => {
      const orderData = order.toObject();

      // Znajdź adres
      const address = addresses.find((a) => a._id.toString() === order.address);
      if (address) orderData.address = address;

      // Znajdź produkty
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
    console.error('Błąd:', error);
    return NextResponse.json({
      success: false,
      message: 'Error fetching orders',
    });
  }
}
