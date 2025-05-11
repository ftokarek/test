import { v2 as cloudinary } from 'cloudinary';
import { getAuth } from '@clerk/nextjs/server';
import authSeller from '@/lib/authSeller';
import { NextResponse } from 'next/server';
import Product from '@/models/Product';
import connectDB from '@/config/db';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    const { userId } = getAuth(request);

    const isSeller = await authSeller(userId);

    if (!isSeller) {
      return new NextResponse({ success: false, message: 'Unauthorized' });
    }

    const formData = await request.formData();
    const name = formData.get('name');
    const description = formData.get('description');
    const category = formData.get('category');
    const price = formData.get('price');
    const offerPrice = formData.get('offerPrice');

    const files = formData.getAll('images');

    if (!files || files.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'No images provided',
      });
    }

    console.log('Files length:', files.length);

    const result = await Promise.all(
      files.map(async (file) => {
        if ((typeof file === 'string' && file === 'undefined') || !file) {
          return null;
        }

        try {
          const arrayBufffer = await file.arrayBuffer();
          const buffer = Buffer.from(arrayBufffer);

          return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              {
                resource_type: 'auto',
              },
              (error, result) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(result);
                }
              }
            );
            stream.end(buffer);
          });
        } catch (error) {
          console.error('Error processing file:', error);
          return null;
        }
      })
    );

    const image = result
      .filter((item) => item !== null && item.secure_url)
      .map((item) => item.secure_url);

    console.log('Image URLs after filtering:', image);

    await connectDB();
    const newProduct = await Product.create({
      userId,
      name,
      description,
      category,
      price: Number(price),
      offerPrice: Number(offerPrice),
      images: image,
      date: Date.now(),
    });

    return NextResponse.json({
      success: true,
      message: 'Product created successfully',
      newProduct,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
