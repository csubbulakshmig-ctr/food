import React from 'react';
import { Star, Plus, Minus, Check } from 'lucide-react';
import { FoodItem } from '../types';
import { FoodImage } from './FoodImage';

interface FoodCardProps {
  item: FoodItem;
  quantityInCart: number;
  onAddToCart: (item: FoodItem) => void;
  onIncrease: (itemId: string) => void;
  onDecrease: (itemId: string) => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({
  item,
  quantityInCart,
  onAddToCart,
  onIncrease,
  onDecrease,
}) => {
  return (
    <div
      id={`food-card-${item.id}`}
      className="bg-white rounded-2xl border border-stone-200/80 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden group hover:border-orange-200"
    >
      {/* Image container */}
      <div className="relative w-full h-48 overflow-hidden bg-stone-100">
        <FoodImage
          src={item.imageUrl}
          alt={item.name}
          dishName={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Veg / Non-Veg Indicator */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-md shadow-sm flex items-center gap-1.5 border border-stone-200">
          <div
            className={`w-3.5 h-3.5 border flex items-center justify-center rounded-[2px] ${
              item.isVeg ? 'border-emerald-600' : 'border-rose-600'
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full ${
                item.isVeg ? 'bg-emerald-600' : 'bg-rose-600'
              }`}
            />
          </div>
          <span className="text-[11px] font-semibold text-stone-700">
            {item.isVeg ? 'Pure Veg' : 'Non-Veg'}
          </span>
        </div>

        {/* Popular Tag */}
        {item.isPopular && (
          <span className="absolute top-3 right-3 bg-amber-500 text-stone-950 text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm tracking-wide">
            Chef's Pick
          </span>
        )}

        {/* Category Pill */}
        <span className="absolute bottom-3 left-3 bg-stone-900/80 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-0.5 rounded-full">
          {item.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-heading font-bold text-stone-900 text-lg group-hover:text-orange-600 transition-colors">
              {item.name}
            </h3>
            <div className="flex items-center gap-1 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded text-emerald-800 text-xs font-bold shrink-0">
              <Star className="w-3 h-3 fill-emerald-600 text-emerald-600" />
              <span>{item.rating}</span>
            </div>
          </div>

          {item.tamilName && (
            <p className="text-xs text-amber-700/90 font-medium mb-1.5 font-sans">
              {item.tamilName}
            </p>
          )}

          <p className="text-stone-600 text-xs line-clamp-2 leading-relaxed mb-3">
            {item.description}
          </p>
        </div>

        {/* Price & Action */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between mt-auto">
          <div>
            <span className="text-xs text-stone-400 block font-medium">Price</span>
            <span className="text-lg font-extrabold text-stone-900">₹{item.price}</span>
          </div>

          <div>
            {quantityInCart === 0 ? (
              <button
                id={`add-btn-${item.id}`}
                onClick={() => onAddToCart(item)}
                className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white rounded-xl text-sm font-semibold shadow-sm hover:shadow active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 px-2 py-1 rounded-xl">
                <button
                  id={`decrease-btn-${item.id}`}
                  onClick={() => onDecrease(item.id)}
                  className="w-7 h-7 rounded-lg bg-white text-orange-600 hover:bg-orange-100 flex items-center justify-center font-bold text-sm shadow-xs border border-orange-200 transition-colors cursor-pointer"
                  aria-label={`Decrease ${item.name}`}
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-6 text-center font-bold text-sm text-stone-900">
                  {quantityInCart}
                </span>
                <button
                  id={`increase-btn-${item.id}`}
                  onClick={() => onIncrease(item.id)}
                  className="w-7 h-7 rounded-lg bg-orange-600 text-white hover:bg-orange-700 flex items-center justify-center font-bold text-sm shadow-xs transition-colors cursor-pointer"
                  aria-label={`Increase ${item.name}`}
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
