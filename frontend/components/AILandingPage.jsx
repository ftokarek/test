'use client';
import React from 'react';
import Image from 'next/image';
import { assets } from '@/assets/assets';
import GridBackground from './GridBackground';
const AILandingPage = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      {/* Background with darkening effect */}
      <div className="absolute inset-0 z-0 opacity-80">
        <Image
          src={assets.ai_office_bg}
          alt="AI office background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

        {/* Custom grid overlay for this section */}
        <div className="absolute inset-0 z-10 opacity-15">
          <GridBackground
            className="h-full w-full"
            gridColor="rgba(59,130,246,0.5)"
          >
            <div className="hidden"></div>
          </GridBackground>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col h-full text-white">
        {/* Central content */}
        <div className="px-8 md:px-16 lg:px-32 flex-1 flex flex-col justify-center">
          <h2 className="text-5xl md:text-7xl font-bold leading-tight mb-8">
            The AI Exchange Hub
          </h2>
          <div className="max-w-2xl">
            <p className="text-2xl md:text-3xl leading-relaxed mb-8">
              Explore a marketplace for powerful
              <br />
              AI models and engineered prompts.
              <br />
              Deploy faster, trade smarter, and
              <br />
              integrate intelligence at scale.
            </p>
          </div>
        </div>

        {/* Down arrow */}
        <div className="flex justify-center mb-10">
          <button
            type="button"
            className="rounded-full border-2 border-white p-4 transition hover:bg-white/10"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AILandingPage;
