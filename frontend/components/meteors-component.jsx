import React from 'react';
import { Meteors } from './ui/meteors';

export function MeteorsDemo({ title, description, icon }) {
  return (
    <div className="">
      <div className="relative w-full max-w-xl">
        <div className="absolute inset-0 h-full w-full scale-[0.80] transform rounded-full bg-red-500 bg-gradient-to-r from-blue-500 to-teal-500 blur-3xl" />
        <div className="relative flex h-full flex-col items-start justify-end overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 px-4 py-4 shadow-xl">
          <div className="mb-4 flex h-5 w-5 items-center justify-center rounded-full">
            {icon}
          </div>

          <h1 className="relative z-50 mb-4 text-xl font-bold text-white">
            {title}
          </h1>

          <p className="relative z-50 mb-4 text-base font-normal text-slate-500">
            {description}
          </p>

          {/* Meaty part - Meteor effect */}
          <Meteors number={20} />
        </div>
      </div>
    </div>
  );
}
