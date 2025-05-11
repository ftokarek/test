import React from 'react';
import { assets } from '@/assets/assets';
import Image from 'next/image';
import { useAppContext } from '@/context/AppContext';

const ProductCard = ({ product }) => {
  const { router } = useAppContext();

  return (
    <div
      onClick={() => {
        router.push('/product/' + product._id);
        scrollTo(0, 0);
      }}
      className="flex flex-col items-start gap-0.5 max-w-[200px] w-full cursor-pointer group"
    >
      <div className="cursor-pointer relative bg-gray-800/30 backdrop-blur-sm border border-blue-500/20 hover:border-blue-500/50 rounded-lg w-full h-52 flex items-center justify-center overflow-hidden transition-all duration-300">
        <Image
          src={product.images[0]}
          alt={product.name}
          className="group-hover:scale-105 transition duration-500 object-contain p-2 w-4/5 h-4/5 md:w-full md:h-full"
          width={800}
          height={800}
        />
        <button className="absolute top-2 right-2 bg-gray-900/60 p-2 rounded-full hover:bg-blue-900/60 transition-colors">
          <Image className="h-3 w-3" src={assets.heart_icon} alt="favorite" />
        </button>

        <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <p className="text-xs text-white line-clamp-2">
            {product.description}
          </p>
        </div>
      </div>

      <p className="md:text-base font-medium pt-2 w-full truncate text-white mt-1">
        {product.name}
      </p>
      <div className="flex items-center gap-2 my-1">
        <p className="text-xs text-gray-400">{4.5}</p>
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, index) => (
            <Image
              key={index}
              className="h-3 w-3"
              src={
                index < Math.floor(4) ? assets.star_icon : assets.star_dull_icon
              }
              alt="star"
            />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between w-full mt-1">
        <p className="text-base font-medium text-blue-400">
          {product.offerPrice} <span className="text-xs">SOL</span>
        </p>
        <button className="px-3 py-1.5 text-blue-400 border border-blue-500/30 rounded-md text-xs hover:bg-blue-500/10 transition">
          Buy now
        </button>
      </div>
      <div className="w-full">
        <p className="text-xs text-gray-400 bg-blue-900/20 px-2 py-1 rounded mt-1 inline-block">
          {product.category}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
