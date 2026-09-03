import React, { useState, useMemo } from 'react';
import { Search, X, Filter, Utensils, Sparkles } from 'lucide-react';
import { Category, FoodItem } from '../types';
import { FOOD_ITEMS } from '../data/foodItems';
import { FoodCard } from '../components/FoodCard';

interface MenuPageProps {
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
  cartItemsMap: Record<string, number>;
  onAddToCart: (item: FoodItem) => void;
  onIncrease: (itemId: string) => void;
  onDecrease: (itemId: string) => void;
}

export const MenuPage: React.FC<MenuPageProps> = ({
  selectedCategory,
  onSelectCategory,
  cartItemsMap,
  onAddToCart,
  onIncrease,
  onDecrease,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dietFilter, setDietFilter] = useState<'all' | 'veg' | 'non-veg'>('all');

  const categories: Category[] = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Beverages'];

  const filteredItems = useMemo(() => {
    return FOOD_ITEMS.filter((item) => {
      // Category match
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;

      // Search match (name or tamil name or description)
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        query === '' ||
        item.name.toLowerCase().includes(query) ||
        (item.tamilName && item.tamilName.toLowerCase().includes(query)) ||
        item.description.toLowerCase().includes(query);

      // Diet match
      const matchesDiet =
        dietFilter === 'all' ||
        (dietFilter === 'veg' && item.isVeg) ||
        (dietFilter === 'non-veg' && !item.isVeg);

      return matchesCategory && matchesSearch && matchesDiet;
    });
  }, [selectedCategory, searchQuery, dietFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Daily Menu</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
          Handcrafted Homestyle Delicacies
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          Explore all our authentic preparations, from steaming morning tiffin to afternoon meals
          and evening snacks. Cooked fresh with unadulterated passion.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* Search Input */}
          <div className="relative w-full md:flex-1">
            <Search className="w-5 h-5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="menu-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes by name (e.g. Masala Dosa, Biryani, Pongal)..."
              className="w-full pl-11 pr-10 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                id="clear-search-btn"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1 cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Diet Toggle Filter (All, Veg, Non-Veg) */}
          <div className="flex items-center gap-1 self-start md:self-auto bg-stone-100 p-1 rounded-xl shrink-0">
            <button
              id="diet-all-btn"
              onClick={() => setDietFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                dietFilter === 'all'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All Items ({FOOD_ITEMS.length})
            </button>
            <button
              id="diet-veg-btn"
              onClick={() => setDietFilter('veg')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                dietFilter === 'veg'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-300" />
              <span>Veg Only</span>
            </button>
            <button
              id="diet-nonveg-btn"
              onClick={() => setDietFilter('non-veg')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                dietFilter === 'non-veg'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-rose-700 hover:bg-rose-50'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-rose-300" />
              <span>Non-Veg</span>
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar border-t border-stone-100">
          <span className="text-xs font-bold text-stone-400 uppercase tracking-wider shrink-0 mr-1 hidden sm:inline">
            Category:
          </span>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                id={`category-filter-${cat}`}
                onClick={() => onSelectCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-orange-600 text-white shadow-sm shadow-orange-600/20'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Food Grid / Empty State */}
      {filteredItems.length > 0 ? (
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-stone-500">
              Showing {filteredItems.length} {filteredItems.length === 1 ? 'dish' : 'dishes'}
              {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
              {searchQuery ? ` matching "${searchQuery}"` : ''}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <FoodCard
                key={item.id}
                item={item}
                quantityInCart={cartItemsMap[item.id] || 0}
                onAddToCart={onAddToCart}
                onIncrease={onIncrease}
                onDecrease={onDecrease}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-16 px-4 bg-white rounded-3xl border border-stone-200/80 shadow-xs max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mx-auto">
            <Utensils className="w-8 h-8" />
          </div>
          <h3 className="font-heading font-bold text-xl text-stone-900">No dishes found</h3>
          <p className="text-stone-500 text-sm">
            We couldn't find any dishes matching your filters or search term. Try resetting your
            search.
          </p>
          <button
            id="reset-filter-btn"
            onClick={() => {
              setSearchQuery('');
              onSelectCategory('All');
              setDietFilter('all');
            }}
            className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm rounded-xl shadow-sm transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
