'use client';

import React from 'react';
import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card';
import { Button } from '@/components/ui/button';
export function ThreeDCardDemo({
  title = 'Make things float in air',
  description = 'Hover over this card to unleash the power of CSS perspective',
  image = 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  buttonText = 'Sign up',
  tryNowText = 'Try now →',
  tryNowLink = '#',
  modelType,
  fullModelName, // pełna nazwa modelu (np. z "GPT" na końcu)
  fullDescription, // pełny opis modelu
  price, // cena w SOL
  rating, // ocena (np. 4.9)
  containerClassName,
  cardClassName,
}) {
  return (
    <CardContainer className={`inter-var ${containerClassName || ''}`}>
      <CardBody
        className={`relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] bg-background dark:border-white/[0.2] border-white/[0.2] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border ${cardClassName || ''}`}
      >
        {/* Model Type Badge */}
        {modelType && (
          <CardItem
            translateZ="80"
            className={`flex items-end justify-end z-10 ${
              modelType === 'GPT Model'
                ? 'bg-blue-600/20 text-blue-500'
                : 'bg-purple-600/20 text-purple-500'
            } px-3 py-2 rounded-full text-xs font-medium`}
          >
            {modelType}
          </CardItem>
        )}

        <CardItem translateZ="100" className="w-full mt-4">
          <img
            src={image}
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>

        {/* Dodajemy sekcję z pełnym opisem, ceną i oceną - wszystko jako CardItems */}
        <div className="mt-8 border-gray-200 dark:border-gray-800">
          <CardItem
            translateZ={100}
            className="text-2xl font-bold text-neutral-200 dark:text-white mb-2 self-start"
          >
            {fullModelName}
          </CardItem>
          <CardItem
            translateZ={35}
            className="flex items-center space-x-2 absolute top-0 right-0"
          >
            <span className="text-yellow-400">★</span>
            <span className="text-sm text-neutral-200">{rating}</span>
          </CardItem>

          {fullDescription && (
            <CardItem
              translateZ={100}
              as="p"
              className="text-gray-200 dark:text-gray-300 text-sm mb-4"
            >
              {fullDescription}
            </CardItem>
          )}

          <div className="flex justify-between items-center">
            <CardItem
              translateZ={100}
              className="text-xl font-bold text-neutral-200 dark:text-white"
            >
              {price} SOL
            </CardItem>

            <CardItem translateZ={100} as="button">
              <Button>{buttonText}</Button>
            </CardItem>
          </div>
        </div>
      </CardBody>
    </CardContainer>
  );
}
