import React from 'react';
import { GlowingEffectDemo } from './glowing-grid';
const HomeProducts = () => {
  const categories = [
    {
      id: 1,
      name: 'GPT Models',
      desc: 'Fine-tuned language models',
      count: 156,
      icon: '🧠',
      color: 'bg-blue-500',
    },
    {
      id: 2,
      name: 'Prompts',
      desc: 'Advanced AI instructions',
      count: 423,
      icon: '📝',
      color: 'bg-purple-500',
    },
    {
      id: 3,
      name: 'Chatbots',
      desc: 'Configurable AI assistants',
      count: 82,
      icon: '💬',
      color: 'bg-green-500',
    },
    {
      id: 4,
      name: 'Data Analysis',
      desc: 'Models for working with data',
      count: 64,
      icon: '📊',
      color: 'bg-amber-500',
    },
    {
      id: 5,
      name: 'Image Generation',
      desc: 'Models for generating images',
      count: 32,
      icon: '🎨',
      color: 'bg-red-500',
    },
  ];

  return (
    <div className="py-16">
      <div className="flex flex-col items-center mb-8">
        <p className="text-3xl text-white font-medium">
          Services{' '}
          <span className="font-medium text-violet-300">Categories</span>
        </p>
        <div className="w-28 h-0.5 bg-white/30 mt-2" />
      </div>
      <GlowingEffectDemo />
    </div>
  );
};

export default HomeProducts;
