import React, { useState } from 'react';
import { ShoppingBag, UtensilsCrossed, Menu, X, User as UserIcon, LogOut, Sparkles } from 'lucide-react';
import { Page, User } from '../types';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  cartCount: number;
  cartTotal: number;
  currentUser: User | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  cartCount,
  cartTotal,
  currentUser,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { name: string; page: Page }[] = [
    { name: 'Home', page: 'home' },
    { name: 'Menu', page: 'menu' },
    { name: 'About', page: 'about' },
    { name: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (page: Page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs">
      {/* Top Banner with phone & delivery announcement */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 animate-pulse" />
        <span>Fresh Home Cooking • Free delivery on orders above ₹250 • Call: +91 98400 12345</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo */}
          <button
            id="nav-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group cursor-pointer"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <UtensilsCrossed className="w-6 h-6" />
            </div>
            <div>
              <span className="font-heading font-extrabold text-xl tracking-tight text-stone-900 block group-hover:text-orange-600 transition-colors">
                Brindha <span className="text-orange-600">Cloud Kitchen</span>
              </span>
              <span className="text-[11px] font-medium text-amber-700 tracking-wider uppercase block -mt-0.5">
                Freshly Made, Delivered with Love
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  id={`nav-link-${link.page}`}
                  onClick={() => handleNavClick(link.page)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'text-orange-600 bg-orange-50 font-bold'
                      : 'text-stone-700 hover:text-orange-600 hover:bg-stone-50'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </nav>

          {/* Action Area: Cart & Account */}
          <div className="flex items-center gap-3">
            {/* User Login/Account Status */}
            {currentUser ? (
              <div className="hidden sm:flex items-center gap-2 bg-stone-100/80 px-3 py-1.5 rounded-xl border border-stone-200">
                <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold">
                  {currentUser.fullName.charAt(0).toUpperCase()}
                </div>
                <span className="text-xs font-medium text-stone-800 max-w-[120px] truncate">
                  {currentUser.fullName}
                </span>
                <button
                  id="user-logout-btn"
                  onClick={onLogout}
                  title="Logout"
                  className="text-stone-400 hover:text-rose-600 transition-colors ml-1 p-1 rounded-md cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                id="nav-login-btn"
                onClick={() => handleNavClick('login')}
                className={`hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold border transition-all cursor-pointer ${
                  currentPage === 'login' || currentPage === 'signup'
                    ? 'border-orange-500 text-orange-600 bg-orange-50'
                    : 'border-stone-200 text-stone-700 hover:border-orange-300 hover:text-orange-600 bg-white'
                }`}
              >
                <UserIcon className="w-4 h-4" />
                <span>Login</span>
              </button>
            )}

            {/* Cart Button with Count Badge */}
            <button
              id="nav-cart-btn"
              onClick={() => handleNavClick('cart')}
              className={`relative px-4 py-2 rounded-xl font-bold text-sm transition-all flex items-center gap-2 shadow-xs cursor-pointer ${
                currentPage === 'cart'
                  ? 'bg-orange-600 text-white shadow-orange-500/25 ring-2 ring-orange-400 ring-offset-1'
                  : 'bg-stone-900 hover:bg-orange-600 text-white'
              }`}
              aria-label="View Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-2.5 -right-2.5 bg-rose-500 text-white text-[10px] font-extrabold w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white animate-in zoom-in-50">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">Cart</span>
              {cartTotal > 0 && (
                <span className="border-l border-white/25 pl-2 text-xs font-semibold text-orange-100">
                  ₹{cartTotal}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-stone-700 hover:bg-stone-100 focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white px-4 pt-2 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <button
              key={link.page}
              id={`mobile-nav-${link.page}`}
              onClick={() => handleNavClick(link.page)}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-base font-semibold cursor-pointer ${
                currentPage === link.page
                  ? 'bg-orange-50 text-orange-600 font-bold'
                  : 'text-stone-700 hover:bg-stone-50'
              }`}
            >
              {link.name}
            </button>
          ))}

          <div className="pt-2 border-t border-stone-100 flex items-center justify-between px-2">
            {currentUser ? (
              <div className="flex items-center justify-between w-full">
                <span className="text-sm font-semibold text-stone-800">
                  Hi, {currentUser.fullName}
                </span>
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-2 w-full">
                <button
                  onClick={() => handleNavClick('login')}
                  className="flex-1 py-2 text-center text-sm font-semibold text-stone-700 bg-stone-100 rounded-xl cursor-pointer"
                >
                  Login
                </button>
                <button
                  onClick={() => handleNavClick('signup')}
                  className="flex-1 py-2 text-center text-sm font-semibold text-white bg-orange-600 rounded-xl cursor-pointer"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
