import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const Banner = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 py-20">
      <div className="flex flex-col items-start justify-center gap-6">
        <div className="space-y-3">
          <p className="text-primary font-medium">BLOCKCHAIN + AI</p>
          <h2 className="text-3xl md:text-4xl font-medium">
            Revolutionize How AI Creates Value
          </h2>
          <p className="text-gray-700 mt-2">
            Our Solana-based platform enables transparent management, trading,
            and monetization of advanced AI prompts and models. This allows for
            the creation and utilization of personalized, effective solutions
            for businesses and individual users.
          </p>
        </div>
        <button className="group flex items-center justify-center gap-1 px-12 py-2.5 bg-primary rounded text-white">
          Learn More
          <svg
            className="w-5 h-5 group-hover:translate-x-1 transition"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>
      </div>
      <div className="h-full md:min-h-[400px] bg-background rounded-xl overflow-hidden flex items-center justify-center p-8">
        <div className="grid grid-cols-1 gap-4 text-white">
          <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
            <h3 className="font-medium text-lg mb-2">
              📊 Transparent Marketplace
            </h3>
            <p>
              Monetize your prompts and models, while the blockchain system
              ensures transparency for all transactions.
            </p>
          </div>
          <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
            <h3 className="font-medium text-lg mb-2">
              🔄 Trading & Speculation
            </h3>
            <p>
              Invest in promising AI models and profit as their value increases
              with popularity.
            </p>
          </div>
          <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
            <h3 className="font-medium text-lg mb-2">
              🔧 Customizable Solutions
            </h3>
            <p>
              Adapt existing prompts and models to your business needs with a
              single click.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
