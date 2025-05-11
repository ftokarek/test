import React, { useState, useEffect } from 'react';
import { assets } from '@/assets/assets';
import Image from 'next/image';

const HeaderSlider = () => {
  const sliderData = [
    {
      id: 1,
      title: 'Discover the Future of AI - Collect and Trade AI Models',
      offer: 'Limited Offer - 30% Discount for New Users',
      buttonText1: 'Buy Now',
      buttonText2: 'Learn More',
      imgSrc: assets.ai_cosmonaut,
    },
    {
      id: 2,
      title: 'Create, Share, Earn - Sell Your Prompts on NeuroSphere',
      offer: 'Exclusive AI Creator Community!',
      buttonText1: 'Join Now',
      buttonText2: 'See Benefits',
      imgSrc: assets.ai_cosmonaut,
    },
    {
      id: 3,
      title: 'Secure AI Asset Trading - Powered by Solana Blockchain',
      offer: 'Zero transaction fees for the first month',
      buttonText1: 'Get Started',
      buttonText2: 'How It Works',
      imgSrc: assets.ai_cosmonaut,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [sliderData.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="overflow-hidden relative w-full">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {sliderData.map((slide, index) => (
          <div
            key={slide.id}
            className="flex flex-col-reverse md:flex-row items-center justify-between bg-gradient-to-r from-gray-900 to-blue-900 py-8 md:px-14 px-5 mt-6 rounded-xl min-w-full"
          >
            <div className="md:pl-8 mt-10 md:mt-0 text-white">
              <p className="md:text-base text-blue-300 pb-1">{slide.offer}</p>
              <h1 className="max-w-lg md:text-[40px] md:leading-[48px] text-2xl font-semibold">
                {slide.title}
              </h1>
              <div className="flex items-center mt-4 md:mt-6 ">
                <button className="md:px-10 px-7 md:py-2.5 py-2 bg-blue-500 hover:bg-blue-600 transition rounded-full text-white font-medium">
                  {slide.buttonText1}
                </button>
                <button className="group flex items-center gap-2 px-6 py-2.5 font-medium text-blue-300 hover:text-blue-200 transition">
                  {slide.buttonText2}
                  <Image
                    className="group-hover:translate-x-1 transition"
                    src={assets.arrow_icon_white}
                    alt="arrow_icon"
                    width={20}
                    height={20}
                  />
                </button>
              </div>
            </div>
            <div className="flex items-center flex-1 justify-center">
              <Image
                className="md:w-72 w-48"
                src={slide.imgSrc}
                alt={`AI Cosmonaut - ${index + 1}`}
                width={300}
                height={300}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 mt-8">
        {sliderData.map((_, index) => (
          <div
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-2 w-2 rounded-full cursor-pointer ${
              currentSlide === index ? 'bg-blue-500' : 'bg-gray-500/30'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeaderSlider;
