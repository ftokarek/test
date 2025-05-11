'use client';
import { useEffect, useState } from 'react';
import { assets } from '@/assets/assets';
import ProductCard from '@/components/ProductCard';
import Layout from '@/components/Layout';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import Loading from '@/components/Loading';
import { useAppContext } from '@/context/AppContext';
import React from 'react';

const Product = () => {
  const { id } = useParams();
  const { products, router, addToCart } = useAppContext();
  const [mainImage, setMainImage] = useState(null);
  const [productData, setProductData] = useState(null);

  const fetchProductData = async () => {
    const product = products.find((product) => product._id === id);
    setProductData(product);
  };

  useEffect(() => {
    fetchProductData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, products.length]);

  return productData ? (
    <Layout>
      <div className="px-6 md:px-16 lg:px-32 pt-20 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="px-5 lg:px-16 xl:px-20">
            <div className="rounded-xl overflow-hidden bg-gray-800/30 mb-4 border border-blue-500/20">
              <Image
                src={mainImage || productData.images[0]}
                alt={productData.name}
                className="w-full h-auto object-contain p-4"
                width={1280}
                height={720}
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              {productData.images.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setMainImage(image)}
                  className={`cursor-pointer rounded-lg overflow-hidden bg-gray-800/30 border ${
                    mainImage === image || (!mainImage && index === 0)
                      ? 'border-blue-500'
                      : 'border-blue-500/20'
                  } hover:border-blue-500 transition-colors`}
                >
                  <Image
                    src={image}
                    alt={`${productData.name} - view ${index + 1}`}
                    className="w-full h-auto object-contain p-2"
                    width={640}
                    height={640}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col bg-gray-900/40 backdrop-blur-sm p-6 rounded-xl border border-blue-500/20">
            <h1 className="text-3xl font-medium text-white mb-4">
              {productData.name}
            </h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-0.5">
                <Image
                  className="h-4 w-4"
                  src={assets.star_icon}
                  alt="star_icon"
                />
                <Image
                  className="h-4 w-4"
                  src={assets.star_icon}
                  alt="star_icon"
                />
                <Image
                  className="h-4 w-4"
                  src={assets.star_icon}
                  alt="star_icon"
                />
                <Image
                  className="h-4 w-4"
                  src={assets.star_icon}
                  alt="star_icon"
                />
                <Image
                  className="h-4 w-4"
                  src={assets.star_dull_icon}
                  alt="star_dull_icon"
                />
              </div>
              <p className="text-gray-300">(4.5)</p>
            </div>
            <p className="text-gray-300 mt-3">{productData.description}</p>
            <p className="text-3xl font-medium mt-6 text-white">
              {productData.offerPrice}{' '}
              <span className="text-blue-400">SOL</span>
              <span className="text-base font-normal text-gray-400 line-through ml-2">
                {productData.price} SOL
              </span>
            </p>
            <hr className="border-gray-700 my-6" />
            <div className="overflow-x-auto">
              <table className="table-auto border-collapse w-full max-w-md">
                <tbody>
                  <tr className="border-b border-gray-800">
                    <td className="text-gray-300 font-medium py-2">Type</td>
                    <td className="text-gray-400 py-2">
                      {productData.category}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="text-gray-300 font-medium py-2">
                      Transactions
                    </td>
                    <td className="text-gray-400 py-2">247</td>
                  </tr>
                  <tr>
                    <td className="text-gray-300 font-medium py-2">Rating</td>
                    <td className="text-gray-400 py-2">4.5/5 (68 reviews)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex items-center mt-10 gap-4">
              <button
                onClick={() => addToCart(productData._id)}
                className="w-full py-3.5 bg-gray-800 text-white hover:bg-gray-700 transition rounded-lg border border-blue-500/20"
              >
                Add to Cart
              </button>
              <button
                onClick={() => {
                  addToCart(productData._id);
                  router.push('/cart');
                }}
                className="w-full py-3.5 bg-blue-600 text-white hover:bg-blue-700 transition rounded-lg"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center mb-4 mt-16">
            <p className="text-3xl font-medium text-white">
              Featured <span className="font-medium text-blue-500">Models</span>
            </p>
            <div className="w-28 h-0.5 bg-blue-500 mt-2"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 pb-14 w-full">
            {products.slice(0, 5).map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
          <button className="px-8 py-2 mb-16 border border-blue-500/50 rounded-lg text-blue-400 hover:bg-blue-500/10 transition">
            View more
          </button>
        </div>
      </div>
    </Layout>
  ) : (
    <Loading />
  );
};

export default Product;
