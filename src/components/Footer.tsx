import React from 'react';
import { UtensilsCrossed, Phone, Mail, MapPin, Clock, Heart, ShieldCheck } from 'lucide-react';
import { Page } from '../types';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (page: Page) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-14 pb-8 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand & Bio */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <div>
                <span className="font-heading font-extrabold text-xl text-white tracking-tight block">
                  Brindha <span className="text-orange-500">Cloud Kitchen</span>
                </span>
                <span className="text-[11px] text-amber-400 font-medium tracking-wide uppercase block">
                  Freshly Made, Delivered with Love
                </span>
              </div>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed mb-4">
              Handcrafted traditional South Indian homestyle meals prepared daily with pure cold-pressed oils, freshly ground spices, and grandma's authentic heirloom recipes.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-400/90 font-medium bg-stone-800/80 px-3 py-2 rounded-xl border border-stone-700/60 w-fit">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>FSSAI Lic. No: 12423008000512</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="font-heading font-bold text-white text-base mb-4 tracking-wide uppercase text-xs">
              Quick Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  Home Page
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('menu')}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  Full Food Menu (17 Items)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  About Our Kitchen Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  Contact & Inquiries
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('cart')}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  Your Active Cart
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Operating Hours */}
          <div>
            <h3 className="font-heading font-bold text-white text-base mb-4 tracking-wide uppercase text-xs">
              Kitchen Operating Hours
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white block font-medium">Breakfast & Snacks</span>
                  <span className="text-xs text-stone-400">7:00 AM – 11:30 AM</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white block font-medium">Lunch Meals & Biryani</span>
                  <span className="text-xs text-stone-400">12:00 PM – 3:30 PM</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white block font-medium">Dinner Specials</span>
                  <span className="text-xs text-stone-400">7:00 PM – 10:30 PM</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div>
            <h3 className="font-heading font-bold text-white text-base mb-4 tracking-wide uppercase text-xs">
              Kitchen & Contact
            </h3>
            <ul className="space-y-3 text-sm text-stone-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <span>#42, 4th Main Road, Anna Nagar West & T. Nagar Cloud Hub, Chennai - 600040</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-orange-400 shrink-0" />
                <a href="tel:+919840012345" className="hover:text-orange-400 transition-colors">
                  +91 98400 12345 / 98400 67890
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-orange-400 shrink-0" />
                <a href="mailto:orders@brindhacloudkitchen.com" className="hover:text-orange-400 transition-colors">
                  orders@brindhacloudkitchen.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-stone-800 text-xs text-stone-400 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Brindha Cloud Kitchen. All rights reserved.</p>
          <div className="flex items-center gap-1 text-stone-400">
            <span>Freshly Made & Delivered with</span>
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 inline" />
            <span>in Chennai</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
