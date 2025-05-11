import React from 'react';
import { cn } from '@/lib/utils';

export const GridBackground = ({
  className,
  children,
  smallGrid = false,
  gridColor = 'rgba(59,130,246,0.08)', // Default blue color for grid lines
  ...props
}) => {
  return (
    <div
      className={cn(
        'h-full w-full bg-background relative flex flex-col items-center justify-center overflow-hidden',
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 w-full h-full">
        {/* Horizontal lines */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `linear-gradient(${gridColor} 1px, transparent 1px)`,
            backgroundSize: smallGrid ? '100% 20px' : '100% 50px',
          }}
        />
        {/* Vertical lines */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`,
            backgroundSize: smallGrid ? '20px 100%' : '50px 100%',
          }}
        />
      </div>
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
};

export default GridBackground;
