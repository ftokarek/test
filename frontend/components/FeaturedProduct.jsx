import React from 'react';
import { ThreeDCardDemo } from './threed-card';
import { Button } from './ui/button';
const FeaturedProduct = () => {
  return (
    <div className="py-4">
      <div className="flex flex-col items-center mb-8">
        <p className="text-3xl text-white font-medium">
          Best <span className="font-medium text-violet-300">AI Models</span>
        </p>
        <div className="w-28 h-0.5 bg-white/30 mt-2" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-x-60">
        <ThreeDCardDemo
          modelType="GPT Model"
          title="FinTech Advisor"
          description="Expert financial analysis & investment advice"
          fullModelName="FinTech Advisor GPT"
          fullDescription="Advanced model specializing in financial analysis, investment advice, and budget planning."
          price="2.5"
          rating="4.9"
          buttonText="Try now"
        />
        <ThreeDCardDemo
          modelType="GPT Model"
          title="FinTech Advisor"
          description="Expert financial analysis & investment advice"
          fullModelName="FinTech Advisor GPT"
          fullDescription="Advanced model specializing in financial analysis, investment advice, and budget planning."
          price="2.5"
          rating="4.9"
          buttonText="Try now"
        />

        <ThreeDCardDemo
          modelType="Prompt Engineer"
          title="Content Creator"
          description="Generate marketing content with brand's voice"
          fullModelName="Content Creator Pro"
          fullDescription="Configurable prompt for generating marketing content tailored to a brand's voice."
          price="0.8"
          rating="4.8"
          buttonText="Try now"
        />
      </div>

      <div className="flex justify-center mt-12">
        <Button>View more models</Button>
      </div>
    </div>
  );
};

export default FeaturedProduct;
