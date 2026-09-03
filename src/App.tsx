import React, { useState, useEffect, useCallback } from 'react';
import { Page, Category, CartItem, FoodItem, User } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { CartPage } from './pages/CartPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { CheckCircle2, ShoppingBag } from 'lucide-react';

export default function App() {
  // Navigation State
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 2800);
  };

  // Cart State (Initialized from localStorage)
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('brindha_kitchen_cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
    }
    return [];
  });

  // User State (Initialized from localStorage)
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('brindha_kitchen_user');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load user from localStorage', e);
    }
    return null;
  });

  // Sync Cart with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('brindha_kitchen_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  // Sync User with localStorage
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('brindha_kitchen_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('brindha_kitchen_user');
      }
    } catch (e) {
      console.error('Failed to save user to localStorage', e);
    }
  }, [currentUser]);

  // Cart Actions
  const handleAddToCart = useCallback((item: FoodItem) => {
    setCart((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
    showToast(`Added ${item.name} to your cart!`);
  }, []);

  const handleIncrease = useCallback((itemId: string) => {
    setCart((prev) =>
      prev.map((ci) => (ci.item.id === itemId ? { ...ci, quantity: ci.quantity + 1 } : ci))
    );
  }, []);

  const handleDecrease = useCallback((itemId: string) => {
    setCart((prev) => {
      const existing = prev.find((ci) => ci.item.id === itemId);
      if (existing && existing.quantity === 1) {
        return prev.filter((ci) => ci.item.id !== itemId);
      }
      return prev.map((ci) =>
        ci.item.id === itemId ? { ...ci, quantity: ci.quantity - 1 } : ci
      );
    });
  }, []);

  const handleRemove = useCallback((itemId: string) => {
    setCart((prev) => prev.filter((ci) => ci.item.id !== itemId));
    showToast('Item removed from cart');
  }, []);

  const handleClearCart = useCallback(() => {
    setCart([]);
  }, []);

  // Compute Cart Item Count and Total
  const cartCount = cart.reduce((acc, ci) => acc + ci.quantity, 0);
  const cartTotal = cart.reduce((acc, ci) => acc + ci.item.price * ci.quantity, 0);

  // Map of itemId -> quantity for instant UI syncing in food cards
  const cartItemsMap = React.useMemo(() => {
    const map: Record<string, number> = {};
    cart.forEach((ci) => {
      map[ci.item.id] = ci.quantity;
    });
    return map;
  }, [cart]);

  // Navigation Handler
  const handleNavigate = useCallback((page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSelectCategory = useCallback((category: Category) => {
    setSelectedCategory(category);
  }, []);

  // Authentication Handlers
  const handleLoginSuccess = useCallback((user: User) => {
    setCurrentUser(user);
    showToast(`Welcome back, ${user.fullName}!`);
  }, []);

  const handleLogout = useCallback(() => {
    setCurrentUser(null);
    showToast('Logged out successfully');
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#fffdfa] text-stone-800 font-sans selection:bg-orange-500 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 bg-stone-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-stone-800 flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-200"
        >
          <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Persistent Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        cartCount={cartCount}
        cartTotal={cartTotal}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main Page Router */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onSelectCategory={handleSelectCategory}
            cartItemsMap={cartItemsMap}
            onAddToCart={handleAddToCart}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
          />
        )}

        {currentPage === 'menu' && (
          <MenuPage
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
            cartItemsMap={cartItemsMap}
            onAddToCart={handleAddToCart}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
          />
        )}

        {currentPage === 'cart' && (
          <CartPage
            cart={cart}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            onRemove={handleRemove}
            onClearCart={handleClearCart}
            onNavigate={handleNavigate}
            currentUser={currentUser}
          />
        )}

        {currentPage === 'about' && <AboutPage onNavigate={handleNavigate} />}

        {currentPage === 'contact' && <ContactPage />}

        {currentPage === 'login' && (
          <LoginPage onNavigate={handleNavigate} onLoginSuccess={handleLoginSuccess} />
        )}

        {currentPage === 'signup' && (
          <SignupPage onNavigate={handleNavigate} onSignupSuccess={handleLoginSuccess} />
        )}
      </main>

      {/* Persistent Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
