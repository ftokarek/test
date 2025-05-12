'use client';
import React from 'react';
import { FlipWords } from './flip-words';
import { WavyBackground } from './ui/wavy-background';
const AILandingPage = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-background ">
      {/* Background with darkening effect */}
      <div className="absolute inset-0 z-0">
        <WavyBackground className="max-w-4xl mx-auto pb-40">
          <p className="text-3xl md:text-4xl lg:text-7xl text-white font-bold inter-var text-center">
            Future of AI
          </p>
          <FlipWords
            className="text-violet-300 text-3xl md:text-4xl lg:text-7xl font-bold inter-var flex justify-center"
            words={['Exchange', 'Commerce', 'Trading']}
            duration={2000}
          />
          <p className="text-lg md:text-xl lg:text-3xl mt-4 text-white font-normal inter-var text-center">
            Explore a marketplace for powerful
            <br />
            AI models and engineered prompts.
            <br />
            Deploy faster, trade smarter, and
            <br />
            integrate intelligence at scale.
          </p>
        </WavyBackground>
        <div className="absolute inset-0" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col h-full text-white">
        {/* Central content */}
        <div className="px-8 md:px-16 lg:px-32 flex-1 flex flex-col justify-center">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-8"></h2>
          <div className="max-w-2xl">
            <p className="text-2xl md:text-3xl leading-relaxed mb-8"></p>
          </div>
        </div>

        {/* Down arrow */}
        <div className="flex justify-center mb-10">
          <button
            type="button"
            className="rounded-full border-2 border-white p-4 transition hover:bg-white/10"
            onClick={() => {
              window.location.href = '#second-section';
            }}
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
