import React from 'react';

const NewsLetter = () => {
  return (
    <div className="bg-background text-white rounded-lg my-16 p-8 md:p-14">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold mb-3">
          Join the NeuroSphere Community
        </h2>
        <p className="text-gray-300 mb-8">
          Subscribe to receive the latest information about AI models, exclusive
          offers, and tips on using AI prompts in your business.
        </p>
        <div className="flex flex-col md:flex-row gap-2 md:gap-0">
          <input
            type="email"
            className="w-full md:flex-grow h-11 md:h-12 bg-white/5 focus:bg-white/10 border border-white/10 focus:border-primary rounded-md md:rounded-r-none px-4 outline-none text-white"
            placeholder="Your email address"
          />
          <button
            type="button"
            className="md:px-12 px-8 py-3 text-white bg-primary rounded-md md:rounded-l-none"
          >
            Subscribe
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-4">
          We respect your privacy. Your data will never be sold or shared with
          third parties.
        </p>
      </div>
    </div>
  );
};

export default NewsLetter;
