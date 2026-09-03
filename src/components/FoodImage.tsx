import React, { useState } from 'react';
import { Utensils } from 'lucide-react';

interface FoodImageProps {
  src: string;
  alt: string;
  className?: string;
  dishName?: string;
}

export const FoodImage: React.FC<FoodImageProps> = ({
  src,
  alt,
  className = 'w-full h-48 object-cover',
  dishName,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (hasError) {
    return (
      <div
        className={`bg-gradient-to-br from-amber-100 to-orange-100 flex flex-col items-center justify-center text-amber-800 p-4 select-none ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="w-12 h-12 rounded-full bg-orange-200/80 flex items-center justify-center mb-2 shadow-sm text-orange-700">
          <Utensils className="w-6 h-6" />
        </div>
        <span className="text-xs font-semibold text-center line-clamp-1 text-stone-700">
          {dishName || alt}
        </span>
        <span className="text-[10px] text-amber-700 font-medium">Brindha Kitchen</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-stone-100 ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-amber-50/70 animate-pulse flex items-center justify-center">
          <Utensils className="w-6 h-6 text-amber-400/60" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
        }}
        className={`w-full h-full object-cover transition-all duration-300 ${
          isLoading ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
        }`}
      />
    </div>
  );
};
