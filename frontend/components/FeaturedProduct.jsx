import React from 'react';
// import { useAppContext } from '@/context/AppContext';

const FeaturedProduct = () => {
  // const { products } = useAppContext();

  return (
    <div className="py-16">
      <div className="flex flex-col items-center mb-8">
        <p className="text-3xl font-medium">
          Best <span className="font-medium text-primary">AI Models</span>
        </p>
        <div className="w-28 h-0.5 bg-primary mt-2"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
        <div className="flex flex-col bg-background rounded-lg overflow-hidden">
          <div className="bg-[#15162c] p-6 pb-12 text-white">
            <div className="flex justify-between items-center mb-4">
              <span className="bg-blue-600/20 text-blue-500 px-3 py-1 rounded-full text-xs font-medium">
                GPT Model
              </span>
              <div className="flex items-center space-x-1">
                <span className="text-yellow-400">★</span>
                <span className="text-sm">4.9 (128)</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-2">FinTech Advisor GPT</h3>
            <p className="text-gray-300 text-sm mb-4">
              Advanced model specializing in financial analysis, investment
              advice, and budget planning. Trained on hundreds of financial
              reports and market analyses.
            </p>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-400">Price</p>
                <p className="text-xl font-bold">2.5 SOL</p>
              </div>
              <button
                type="button"
                className="flex items-center gap-1.5 bg-primary px-4 py-2 rounded"
              >
                <span>Details</span>
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M13 7L18 12M18 12L13 17M18 12H6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="p-4 bg-[#0d0e21] text-white">
            <div className="flex justify-between">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold">
                  DF
                </div>
                <span>DataFinance</span>
              </div>
              <div className="text-xs text-gray-400">Sales: 278</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col bg-background rounded-lg overflow-hidden">
          <div className="bg-[#15162c] p-6 pb-12 text-white">
            <div className="flex justify-between items-center mb-4">
              <span className="bg-purple-600/20 text-purple-500 px-3 py-1 rounded-full text-xs font-medium">
                Prompt Engineer
              </span>
              <div className="flex items-center space-x-1">
                <span className="text-yellow-400">★</span>
                <span className="text-sm">4.8 (96)</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-2">Content Creator Pro</h3>
            <p className="text-gray-300 text-sm mb-4">
              Configurable prompt for generating marketing content. Creates blog
              articles, social media posts, and newsletters tailored to a
              brand&apos;s voice and tone.
            </p>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-400">Price</p>
                <p className="text-xl font-bold">0.8 SOL</p>
              </div>
              <button
                type="button"
                className="flex items-center gap-1.5 bg-primary px-4 py-2 rounded"
              >
                <span>Details</span>
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M13 7L18 12M18 12L13 17M18 12H6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="p-4 bg-[#0d0e21] text-white">
            <div className="flex justify-between">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center text-xs font-bold">
                  CM
                </div>
                <span>ContentMaster</span>
              </div>
              <div className="text-xs text-gray-400">Sales: 164</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          className="px-8 py-2 border border-primary rounded text-primary hover:bg-primary/5 transition"
        >
          View more models
        </button>
      </div>
    </div>
  );
};

export default FeaturedProduct;
