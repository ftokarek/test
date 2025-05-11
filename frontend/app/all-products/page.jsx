'use client';
import ProductCard from '@/components/ProductCard';
import Layout from '@/components/Layout';
import { useAppContext } from '@/context/AppContext';

const AllProducts = () => {
  const { products } = useAppContext();

  return (
    <Layout>
      <div className="flex flex-col items-start px-6 md:px-16 lg:px-32 pt-20">
        <div className="flex flex-col items-center w-full pt-12 mb-6">
          <h2 className="text-3xl font-medium text-white">
            All <span className="font-medium text-blue-500">Products</span>
          </h2>
          <div className="w-28 h-0.5 bg-blue-500 mt-2"></div>
          <p className="text-gray-300 mt-4">
            Explore our marketplace of AI models, prompts and tools
          </p>
        </div>
        <div className="py-12 w-full">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pb-20 w-full">
            {products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AllProducts;
