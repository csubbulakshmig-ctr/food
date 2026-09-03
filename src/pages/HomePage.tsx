import React from 'react';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  HeartHandshake,
  Clock,
  Award,
  Flame,
  ChefHat,
  Copy,
  Check,
} from 'lucide-react';
import { FoodItem, Category, Page } from '../types';
import { HERO_IMAGE_URL, FOOD_ITEMS } from '../data/foodItems';
import { FoodCard } from '../components/FoodCard';
import { FoodImage } from '../components/FoodImage';

interface HomePageProps {
  onNavigate: (page: Page) => void;
  onSelectCategory: (category: Category) => void;
  cartItemsMap: Record<string, number>;
  onAddToCart: (item: FoodItem) => void;
  onIncrease: (itemId: string) => void;
  onDecrease: (itemId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectCategory,
  cartItemsMap,
  onAddToCart,
  onIncrease,
  onDecrease,
}) => {
  const [copiedCode, setCopiedCode] = React.useState(false);

  const categories: { name: Category; count: number; desc: string; icon: string }[] = [
    { name: 'Breakfast', count: 4, desc: 'Idli, Dosa, Pongal & Poori', icon: '🥞' },
    { name: 'Lunch', count: 4, desc: 'South Meals & Fragrant Biryani', icon: '🍛' },
    { name: 'Dinner', count: 3, desc: 'Parotta Salna, Chapathi & Rice', icon: '🥘' },
    { name: 'Snacks', count: 3, desc: 'Hot Samosas, Cutlet & Fries', icon: '🥟' },
    { name: 'Beverages', count: 3, desc: 'Kumbakonam Coffee & Tea', icon: '☕' },
  ];

  const popularDishes = FOOD_ITEMS.filter((item) => item.isPopular).slice(0, 4);

  const handleCategoryClick = (cat: Category) => {
    onSelectCategory(cat);
    onNavigate('menu');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyCoupon = () => {
    navigator.clipboard?.writeText('FRESH15');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div className="space-y-16 sm:space-y-20 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-orange-50/60 via-amber-50/30 to-white pt-8 pb-12 sm:pt-14 sm:pb-20 border-b border-stone-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100/90 border border-orange-200/80 text-orange-800 text-xs font-bold shadow-xs">
                <ChefHat className="w-4 h-4 text-orange-600" />
                <span>100% Authentic Home-Style Cooking</span>
              </div>

              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 tracking-tight leading-[1.15]">
                Delicious Food,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-red-600">
                  Made with Love
                </span>
              </h1>

              <p className="text-stone-600 text-base sm:text-lg leading-relaxed max-w-2xl">
                Experience the warmth of home in every bite. At Brindha Cloud Kitchen, we cook
                wholesome South Indian breakfast, authentic banana-leaf meals, fragrant seeraga
                samba biryanis, and crispy snacks using pure ingredients, cold-pressed oils, and no
                artificial preservatives.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  id="hero-explore-menu-btn"
                  onClick={() => {
                    onSelectCategory('All');
                    onNavigate('menu');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-7 py-3.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-xl font-bold text-base shadow-lg shadow-orange-600/25 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore Menu</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  id="hero-order-now-btn"
                  onClick={() => {
                    onSelectCategory('All');
                    onNavigate('menu');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-7 py-3.5 bg-white hover:bg-stone-50 text-stone-800 border-2 border-stone-200 hover:border-orange-300 rounded-xl font-bold text-base shadow-xs active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Flame className="w-5 h-5 text-orange-600" />
                  <span>Order Now</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-4 grid grid-cols-3 gap-4 border-t border-stone-200/80 text-stone-700">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold block text-stone-900">100% Hygienic</span>
                    <span className="text-[11px] text-stone-500">Sanitized kitchen</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-700 font-bold shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold block text-stone-900">30-40 Mins</span>
                    <span className="text-[11px] text-stone-500">Hot doorstep drop</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700 font-bold shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold block text-stone-900">4.8 ★ Rated</span>
                    <span className="text-[11px] text-stone-500">Over 10,000+ orders</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Right Image Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative glow */}
                <div className="absolute -inset-2 bg-gradient-to-r from-orange-400/20 to-amber-300/30 rounded-3xl blur-xl" />

                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                  <FoodImage
                    src={HERO_IMAGE_URL}
                    alt="Authentic Indian home-style food feast served on traditional table"
                    dishName="South Indian Traditional Spread"
                    className="w-full h-80 sm:h-96 object-cover"
                  />

                  {/* Floating badge 1: Fresh Daily */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border border-stone-100 flex items-center gap-2.5">
                    <span className="text-xl">🌿</span>
                    <div>
                      <span className="text-[11px] font-bold text-stone-800 block">
                        Fresh Ingredients Daily
                      </span>
                      <span className="text-[10px] text-stone-500">No preservatives added</span>
                    </div>
                  </div>

                  {/* Floating badge 2: Cooked on Order */}
                  <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-stone-100 flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                    <div>
                      <span className="text-xs font-bold text-stone-800 block">
                        Live Kitchen Active
                      </span>
                      <span className="text-[10px] text-emerald-600 font-medium">
                        Accepting orders now
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FOOD CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600 block mb-1">
              Explore Our Kitchen
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-stone-900">
              Browse by Meal Category
            </h2>
          </div>
          <button
            onClick={() => {
              onSelectCategory('All');
              onNavigate('menu');
            }}
            className="text-sm font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 cursor-pointer"
          >
            <span>View All Menu</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.name}
              id={`cat-card-${cat.name}`}
              onClick={() => handleCategoryClick(cat.name)}
              className="bg-white p-5 rounded-2xl border border-stone-200/80 hover:border-orange-400 hover:shadow-md transition-all text-left group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <span className="text-3xl mb-3 block group-hover:scale-110 transition-transform">
                  {cat.icon}
                </span>
                <h3 className="font-heading font-bold text-stone-900 text-lg group-hover:text-orange-600 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
                  {cat.desc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-amber-700 font-bold">
                <span>{cat.count} Dishes</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 3. POPULAR DISHES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange-600 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Customer Favorites</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-stone-900">
              Popular Dishes from Our Stoves
            </h2>
          </div>
          <button
            onClick={() => {
              onSelectCategory('All');
              onNavigate('menu');
            }}
            className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            See All 17 Delicacies
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularDishes.map((dish) => (
            <FoodCard
              key={dish.id}
              item={dish}
              quantityInCart={cartItemsMap[dish.id] || 0}
              onAddToCart={onAddToCart}
              onIncrease={onIncrease}
              onDecrease={onDecrease}
            />
          ))}
        </div>
      </section>

      {/* 4. SPECIAL OFFER BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-600 via-amber-600 to-red-600 p-8 sm:p-12 text-white shadow-xl">
          {/* Subtle pattern background */}
          <div className="absolute -right-10 -bottom-10 opacity-15 select-none pointer-events-none text-9xl">
            🍛
          </div>

          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-block bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider text-amber-100">
              Limited Welcome Offer
            </span>

            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight">
              Enjoy 15% OFF on your very first order!
            </h2>

            <p className="text-orange-100 text-sm sm:text-base leading-relaxed">
              Use our exclusive coupon code at checkout to enjoy grandma's delicious homemade recipes
              at a warm discounted price. Valid on all breakfast, meals, and snacks.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <div className="flex items-center bg-stone-950/80 backdrop-blur-md border border-white/20 px-4 py-2.5 rounded-xl font-mono text-base font-bold text-amber-300 gap-3 shadow-inner">
                <span>FRESH15</span>
                <button
                  onClick={copyCoupon}
                  title="Copy coupon code"
                  className="text-white hover:text-amber-400 transition-colors cursor-pointer p-1"
                >
                  {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <button
                id="offer-order-btn"
                onClick={() => {
                  onSelectCategory('All');
                  onNavigate('menu');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-2.5 bg-white text-orange-700 hover:bg-orange-50 font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer"
              >
                Claim Offer & Order
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600 block">
            Our Quality Promise
          </span>
          <h2 className="font-heading text-3xl font-extrabold text-stone-900">
            Why Foodies Love Brindha Cloud Kitchen
          </h2>
          <p className="text-stone-600 text-sm">
            We don't cut corners on ingredients or preparation. Every recipe is crafted just like at
            home.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold mb-4">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-stone-900 text-base mb-2">
              100% Home-Style Recipes
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Passed down through generations, cooked in small batches to preserve authentic South
              Indian aroma and depth of flavor.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-stone-900 text-base mb-2">
              Fresh Ingredients Daily
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Locally sourced vegetables, farm-fresh poultry, pure cold-pressed sesame & groundnut
              oils, and hand-roasted spices.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-stone-900 text-base mb-2">
              Strict Hygiene Standards
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Temperature-controlled prep counters, sanitized cookware, food-grade eco-friendly
              packaging, and certified staff.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-stone-900 text-base mb-2">
              Piping Hot Delivery
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Dispatched immediately in insulated thermal carry packs so your parottas stay flaky and
              your sambar stays steaming hot.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
