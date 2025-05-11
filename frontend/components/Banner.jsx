import React from 'react';
import { MeteorsDemo } from './meteors-component';
import { Button } from './ui/button';
const Banner = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 py-20">
      <div className="flex flex-col items-start justify-center gap-6">
        <div className="space-y-3">
          <p className="text-violet-300 font-medium">BLOCKCHAIN + AI</p>
          <h2 className="text-3xl md:text-4xl text-white font-medium">
            Revolutionize How AI Creates Value
          </h2>
          <p className="text-gray-500 mt-2">
            Our Solana-based platform enables transparent management, trading,
            and monetization of advanced AI prompts and models. This allows for
            the creation and utilization of personalized, effective solutions
            for businesses and individual users.
          </p>
        </div>
        <Button>Learn More</Button>
      </div>
      <div className="h-full md:min-h-[400px] rounded-xl flex items-center justify-center p-8">
        <div className="grid grid-cols-1 gap-10 text-white">
          <MeteorsDemo
            title={'Transparent Marketplace'}
            description={
              'Monetize your prompts and models, while the blockchain system ensures transparency for all transactions.'
            }
            icon={'📊 '}
          />
          <MeteorsDemo
            title={'Trading & Speculation'}
            description={
              'Invest in promising AI models and profit as their value increases with popularity.'
            }
            icon={'🔄 '}
          />
          <MeteorsDemo
            title={'Customizable Solutions'}
            description={
              'Adapt existing prompts and models to your business needs with a single click.'
            }
            icon={'🔧 '}
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
