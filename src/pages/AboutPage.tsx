import React from 'react';
import {
  Heart,
  ShieldCheck,
  Sparkles,
  Users,
  Award,
  CheckCircle2,
  ChefHat,
  Leaf,
  Clock,
} from 'lucide-react';
import { Page } from '../types';
import { HERO_IMAGE_URL } from '../data/foodItems';
import { FoodImage } from '../components/FoodImage';

interface AboutPageProps {
  onNavigate: (page: Page) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16 sm:space-y-20">
      {/* 1. Header & Hero Story */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 text-orange-800 text-xs font-bold">
            <Heart className="w-3.5 h-3.5 text-orange-600 fill-orange-600" />
            <span>Our Kitchen Heritage</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight">
            Rooted in Tradition, Cooked with Modern Hygiene
          </h1>

          <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
            Brindha Cloud Kitchen started with a simple, cherished philosophy: bringing the authentic,
            soul-satisfying comfort of homemade South Indian food to working families, students, and
            food enthusiasts who miss real home cooking.
          </p>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Founded by Brindha Amma and her family in Chennai, our cloud kitchen prepares every pot of
            sambar, every batch of fragrant seeraga samba biryani, and every ladle of slow-cooked
            kurma using the exact spice blends and hand-ground masalas perfected over forty years.
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <button
              onClick={() => {
                onNavigate('menu');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              Explore Today's Menu
            </button>
            <button
              onClick={() => {
                onNavigate('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3 bg-white text-stone-700 border border-stone-200 hover:bg-stone-50 rounded-xl font-bold text-sm shadow-xs transition-all cursor-pointer"
            >
              Get in Touch
            </button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="lg:col-span-5 relative">
          <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-white">
            <FoodImage
              src={HERO_IMAGE_URL}
              alt="Traditional South Indian homestyle food cooking"
              dishName="Kitchen Traditions"
              className="w-full h-80 sm:h-96 object-cover"
            />
            <div className="p-4 bg-stone-900 text-white text-center">
              <span className="font-heading font-bold text-base block text-amber-400">
                Brindha Amma's Promise
              </span>
              <span className="text-xs text-stone-300">
                "We only serve what we would proudly feed our own children."
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FIVE CORE PILLARS (Requested in Prompt) */}
      <section className="space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600 block">
            What Drives Us
          </span>
          <h2 className="font-heading text-3xl font-extrabold text-stone-900">
            Our Five Core Pillars
          </h2>
          <p className="text-stone-600 text-sm">
            Everything we cook is guided by these uncompromising kitchen commitments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {/* Pillar 1: Fresh Ingredients */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-4">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-stone-900 text-base mb-2">
                1. Fresh Ingredients
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Vegetables and meats are procured fresh at dawn daily. We never use frozen bases,
                stale batters, or artificial flavor enhancers.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center gap-1 text-[11px] font-bold text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Daily farm sourcing</span>
            </div>
          </div>

          {/* Pillar 2: Hygienic Cooking */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-stone-900 text-base mb-2">
                2. Hygienic Cooking
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Our kitchen adheres strictly to stainless-steel cleanliness, UV-sterilized cookware,
                and temperature-checked packing protocols.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center gap-1 text-[11px] font-bold text-blue-700">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>FSSAI Certified Hub</span>
            </div>
          </div>

          {/* Pillar 3: Homemade Taste */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center font-bold mb-4">
                <ChefHat className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-stone-900 text-base mb-2">
                3. Homemade Taste
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Small-batch cooking that honors authentic home gravies, balanced spice levels, and
                grandma's signature slow-roast techniques.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center gap-1 text-[11px] font-bold text-orange-700">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Heirloom recipes</span>
            </div>
          </div>

          {/* Pillar 4: Quality Food */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-stone-900 text-base mb-2">
                4. Quality Food
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Only pure wood-pressed sesame oil, fresh dairy butter, and whole aromatic spices make
                their way into our cooking pans.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center gap-1 text-[11px] font-bold text-amber-700">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Zero adulteration</span>
            </div>
          </div>

          {/* Pillar 5: Customer Satisfaction */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-stone-900 text-base mb-2">
                5. Customer Care
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                We listen to every note, accommodate taste preferences, and guarantee prompt
                resolution if anything falls short of expectations.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center gap-1 text-[11px] font-bold text-purple-700">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>4.8/5 Star Average</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Kitchen Quality & Safety Checklist */}
      <section className="bg-stone-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-400 block">
              Behind the Scenes
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
              Strict Hygiene and Quality Protocols
            </h2>
            <p className="text-stone-300 text-sm leading-relaxed">
              Every staff member in our cloud kitchen is food-safety certified. From incoming raw
              produce sanitation to insulated tamper-evident delivery packaging, your health and
              satisfaction are treated with highest reverence.
            </p>
            <ul className="space-y-2.5 text-xs text-stone-300 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>RO Purified water used for all cooking, curries, and beverages</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero artificial food colorants (No Ajinomoto / MSG, No artificial red/orange dyes)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Fresh oil guarantee (oil is never repeatedly reheated or reused)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Eco-friendly, food-grade thermal containers that keep curries piping hot</span>
              </li>
            </ul>
          </div>

          {/* Stat block */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-stone-800/90 p-5 rounded-2xl border border-stone-700 text-center">
              <span className="font-heading font-extrabold text-3xl sm:text-4xl text-orange-500 block">
                10,000+
              </span>
              <span className="text-xs text-stone-300 mt-1 block">Happy Meals Delivered</span>
            </div>

            <div className="bg-stone-800/90 p-5 rounded-2xl border border-stone-700 text-center">
              <span className="font-heading font-extrabold text-3xl sm:text-4xl text-amber-400 block">
                4.8 / 5
              </span>
              <span className="text-xs text-stone-300 mt-1 block">Google & Foodie Rating</span>
            </div>

            <div className="bg-stone-800/90 p-5 rounded-2xl border border-stone-700 text-center">
              <span className="font-heading font-extrabold text-3xl sm:text-4xl text-emerald-400 block">
                100%
              </span>
              <span className="text-xs text-stone-300 mt-1 block">Natural Ground Spices</span>
            </div>

            <div className="bg-stone-800/90 p-5 rounded-2xl border border-stone-700 text-center">
              <span className="font-heading font-extrabold text-3xl sm:text-4xl text-blue-400 block">
                30 Mins
              </span>
              <span className="text-xs text-stone-300 mt-1 block">Average Kitchen Dispatch</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
