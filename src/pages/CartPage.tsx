import React, { useState } from 'react';
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  MapPin,
  Phone,
  Tag,
  X,
  ChefHat,
  Bike,
} from 'lucide-react';
import { CartItem, Page, User } from '../types';
import { FoodImage } from '../components/FoodImage';

interface CartPageProps {
  cart: CartItem[];
  onIncrease: (itemId: string) => void;
  onDecrease: (itemId: string) => void;
  onRemove: (itemId: string) => void;
  onClearCart: () => void;
  onNavigate: (page: Page) => void;
  currentUser: User | null;
}

export const CartPage: React.FC<CartPageProps> = ({
  cart,
  onIncrease,
  onDecrease,
  onRemove,
  onClearCart,
  onNavigate,
  currentUser,
}) => {
  // Coupon state
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState('');

  // Delivery details form
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(currentUser?.phone || '');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'upi' | 'card'>('upi');

  // Form errors
  const [formErrors, setFormErrors] = useState<{ address?: string; phone?: string }>({});

  // Placed Order state for celebration modal
  const [placedOrderInfo, setPlacedOrderInfo] = useState<{
    orderId: string;
    items: CartItem[];
    grandTotal: number;
    address: string;
    phone: string;
    deliveryTime: string;
  } | null>(null);

  // Calculations
  const subtotal = cart.reduce((acc, item) => acc + item.item.price * item.quantity, 0);
  const isFreeDelivery = subtotal >= 250 || subtotal === 0;
  const deliveryFee = isFreeDelivery ? 0 : 30;

  // Coupon discount: 15% discount with FRESH15
  const discountPercent = appliedCoupon === 'FRESH15' ? 0.15 : 0;
  const discountAmount = Math.round(subtotal * discountPercent);

  // Taxes: 5% GST
  const taxes = Math.round((subtotal - discountAmount) * 0.05);

  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee + taxes);

  // Handle coupon
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const code = couponInput.trim().toUpperCase();
    if (!code) return;

    if (code === 'FRESH15') {
      setAppliedCoupon('FRESH15');
      setCouponInput('');
    } else {
      setCouponError('Invalid coupon code. Try FRESH15 for 15% off.');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponError('');
  };

  // Place Order Handler
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const errors: { address?: string; phone?: string } = {};

    if (!deliveryAddress.trim() || deliveryAddress.trim().length < 8) {
      errors.address = 'Please provide a complete delivery address (minimum 8 characters)';
    }

    const cleanPhone = phoneNumber.trim().replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errors.phone = 'Please enter a valid 10-digit mobile number';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});

    const randomId = 'BK-' + Math.floor(100000 + Math.random() * 900000);

    setPlacedOrderInfo({
      orderId: randomId,
      items: [...cart],
      grandTotal,
      address: deliveryAddress.trim(),
      phone: phoneNumber.trim(),
      deliveryTime: '30-40 mins',
    });

    // Clear cart in state & localStorage
    onClearCart();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* 1. ORDER CONFIRMATION MODAL / OVERLAY */}
      {placedOrderInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-stone-100 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm animate-in zoom-in">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                Order Confirmed
              </span>
              <h2 className="font-heading text-2xl font-extrabold text-stone-900">
                Cooking with Love for You!
              </h2>
              <p className="text-xs text-stone-500">
                Order ID: <span className="font-mono font-bold text-stone-800">{placedOrderInfo.orderId}</span>
              </p>
            </div>

            {/* Live tracker simulator */}
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/80 space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-stone-700">
                <span className="flex items-center gap-1.5 text-orange-600">
                  <Clock className="w-4 h-4" />
                  Estimated Delivery: {placedOrderInfo.deliveryTime}
                </span>
                <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Kitchen Accepted
                </span>
              </div>

              {/* Progress Steps */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[11px] font-medium">
                <div className="flex flex-col items-center gap-1 text-emerald-700 font-bold">
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                    ✓
                  </div>
                  <span>Received</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-orange-600 font-bold">
                  <div className="w-7 h-7 rounded-full bg-orange-500 text-white flex items-center justify-center animate-pulse">
                    <ChefHat className="w-4 h-4" />
                  </div>
                  <span>Preparing</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-stone-400">
                  <div className="w-7 h-7 rounded-full bg-stone-200 text-stone-500 flex items-center justify-center">
                    <Bike className="w-4 h-4" />
                  </div>
                  <span>On the way</span>
                </div>
              </div>
            </div>

            {/* Order Items Preview */}
            <div className="border-t border-b border-stone-100 py-3 space-y-2 text-xs">
              <span className="font-bold text-stone-700 block">Ordered Items:</span>
              <ul className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                {placedOrderInfo.items.map((ci) => (
                  <li key={ci.item.id} className="flex justify-between text-stone-600">
                    <span>
                      {ci.quantity}x {ci.item.name}
                    </span>
                    <span className="font-semibold text-stone-900">
                      ₹{ci.item.price * ci.quantity}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between font-bold text-stone-900 pt-2 border-t border-stone-100 text-sm">
                <span>Total Amount Paid</span>
                <span className="text-orange-600">₹{placedOrderInfo.grandTotal}</span>
              </div>
            </div>

            {/* Address */}
            <div className="text-xs text-stone-600 space-y-1">
              <span className="font-bold text-stone-700 block">Delivery Address:</span>
              <p className="bg-stone-50 p-2.5 rounded-xl border border-stone-200 text-stone-700">
                {placedOrderInfo.address} • Ph: {placedOrderInfo.phone}
              </p>
            </div>

            {/* Close / Action */}
            <button
              id="order-modal-close-btn"
              onClick={() => {
                setPlacedOrderInfo(null);
                onNavigate('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              Done & Return Home
            </button>
          </div>
        </div>
      )}

      {/* 2. EMPTY CART VIEW */}
      {cart.length === 0 && !placedOrderInfo ? (
        <div className="max-w-md mx-auto text-center py-16 px-4 bg-white rounded-3xl border border-stone-200/80 shadow-xs space-y-5">
          <div className="w-20 h-20 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mx-auto shadow-inner">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h2 className="font-heading text-2xl font-extrabold text-stone-900">
              Your Cart is Empty
            </h2>
            <p className="text-stone-500 text-sm leading-relaxed">
              Looks like you haven't added any dishes yet. Explore our delicious homestyle menu and
              treat yourself to fresh South Indian food.
            </p>
          </div>
          <button
            id="empty-cart-explore-btn"
            onClick={() => {
              onNavigate('menu');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <span>Explore Delicious Menu</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        /* 3. ACTIVE CART WITH ITEMS */
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
            <div>
              <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-stone-900">
                Your Delicious Feast Cart
              </h1>
              <p className="text-stone-500 text-sm">
                You have {cart.reduce((acc, ci) => acc + ci.quantity, 0)} item(s) selected
              </p>
            </div>
            <button
              id="clear-cart-btn"
              onClick={onClearCart}
              className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 self-start sm:self-auto cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>Empty Entire Cart</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Col: Cart Items List */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-white rounded-2xl border border-stone-200/80 shadow-xs divide-y divide-stone-100 overflow-hidden">
                {cart.map((cartItem) => {
                  const itemTotal = cartItem.item.price * cartItem.quantity;
                  return (
                    <div
                      key={cartItem.item.id}
                      id={`cart-item-${cartItem.item.id}`}
                      className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:bg-stone-50/50 transition-colors"
                    >
                      {/* Image */}
                      <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-xl overflow-hidden shrink-0 border border-stone-100 bg-stone-100">
                        <FoodImage
                          src={cartItem.item.imageUrl}
                          alt={cartItem.item.name}
                          dishName={cartItem.item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-heading font-bold text-stone-900 text-base">
                            {cartItem.item.name}
                          </h3>
                          <button
                            id={`remove-item-${cartItem.item.id}`}
                            onClick={() => onRemove(cartItem.item.id)}
                            className="text-stone-400 hover:text-rose-600 p-1 transition-colors cursor-pointer"
                            title="Remove item"
                            aria-label={`Remove ${cartItem.item.name}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {cartItem.item.tamilName && (
                          <p className="text-xs text-amber-700 font-medium">
                            {cartItem.item.tamilName}
                          </p>
                        )}

                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-semibold text-stone-500">
                            ₹{cartItem.item.price} each
                          </span>
                          <span className="text-stone-300">•</span>
                          <span className="text-xs font-bold text-stone-900">
                            Subtotal: ₹{itemTotal}
                          </span>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                        <div className="flex items-center gap-2 bg-orange-50/80 border border-orange-200 px-2 py-1 rounded-xl">
                          <button
                            id={`cart-decrease-${cartItem.item.id}`}
                            onClick={() => onDecrease(cartItem.item.id)}
                            className="w-7 h-7 rounded-lg bg-white text-orange-700 hover:bg-orange-100 flex items-center justify-center font-bold text-sm shadow-xs transition-colors cursor-pointer"
                            aria-label={`Decrease quantity of ${cartItem.item.name}`}
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-7 text-center font-bold text-sm text-stone-900">
                            {cartItem.quantity}
                          </span>
                          <button
                            id={`cart-increase-${cartItem.item.id}`}
                            onClick={() => onIncrease(cartItem.item.id)}
                            className="w-7 h-7 rounded-lg bg-orange-600 text-white hover:bg-orange-700 flex items-center justify-center font-bold text-sm shadow-xs transition-colors cursor-pointer"
                            aria-label={`Increase quantity of ${cartItem.item.name}`}
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Delivery Free Banner note */}
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center gap-2.5 text-xs text-amber-900">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  {subtotal >= 250 ? (
                    <strong className="text-emerald-700">
                      Awesome! You unlocked FREE Doorstep Delivery!
                    </strong>
                  ) : (
                    <span>
                      Add <strong>₹{250 - subtotal}</strong> more to qualify for{' '}
                      <strong>FREE Delivery</strong> (Order above ₹250).
                    </span>
                  )}
                </span>
              </div>
            </div>

            {/* Right Col: Order Summary & Checkout Form */}
            <div className="lg:col-span-5 space-y-6">
              {/* Checkout & Delivery Form */}
              <form
                id="checkout-form"
                onSubmit={handlePlaceOrder}
                className="bg-white rounded-2xl border border-stone-200/80 shadow-xs p-6 space-y-5"
              >
                <h2 className="font-heading font-bold text-lg text-stone-900 pb-3 border-b border-stone-100">
                  Delivery Details
                </h2>

                {/* Delivery Address */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-orange-600" />
                    <span>Delivery Address *</span>
                  </label>
                  <textarea
                    id="cart-address-input"
                    rows={2}
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Door no, Street, Landmark, Area (e.g. #14, 2nd Cross, Anna Nagar)"
                    className={`w-full p-3 bg-stone-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all ${
                      formErrors.address ? 'border-rose-500 bg-rose-50/30' : 'border-stone-200'
                    }`}
                  />
                  {formErrors.address && (
                    <p className="text-[11px] font-medium text-rose-600">{formErrors.address}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-orange-600" />
                    <span>Contact Phone *</span>
                  </label>
                  <input
                    id="cart-phone-input"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="10-digit mobile number"
                    className={`w-full px-3.5 py-2.5 bg-stone-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all ${
                      formErrors.phone ? 'border-rose-500 bg-rose-50/30' : 'border-stone-200'
                    }`}
                  />
                  {formErrors.phone && (
                    <p className="text-[11px] font-medium text-rose-600">{formErrors.phone}</p>
                  )}
                </div>

                {/* Delivery Notes */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 block">
                    Special Cooking / Delivery Instructions (Optional)
                  </label>
                  <input
                    id="cart-notes-input"
                    type="text"
                    value={deliveryNotes}
                    onChange={(e) => setDeliveryNotes(e.target.value)}
                    placeholder="e.g. Please send extra spicy salna / ring bell"
                    className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
                  />
                </div>

                {/* Payment Method Selector */}
                <div className="space-y-2 pt-2 border-t border-stone-100">
                  <label className="text-xs font-bold text-stone-700 block">Payment Method</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      id="pay-upi-btn"
                      onClick={() => setPaymentMethod('upi')}
                      className={`py-2 px-2 text-center rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        paymentMethod === 'upi'
                          ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-xs'
                          : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      UPI / GPay
                    </button>
                    <button
                      type="button"
                      id="pay-cod-btn"
                      onClick={() => setPaymentMethod('cod')}
                      className={`py-2 px-2 text-center rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        paymentMethod === 'cod'
                          ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-xs'
                          : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      Cash on Delivery
                    </button>
                    <button
                      type="button"
                      id="pay-card-btn"
                      onClick={() => setPaymentMethod('card')}
                      className={`py-2 px-2 text-center rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        paymentMethod === 'card'
                          ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-xs'
                          : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      Card / Netbanking
                    </button>
                  </div>
                </div>

                {/* Coupon Code Section */}
                <div className="pt-2 border-t border-stone-100 space-y-2">
                  <label className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-orange-600" />
                    <span>Have a Coupon Code?</span>
                  </label>

                  {appliedCoupon ? (
                    <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-xl text-xs font-bold text-emerald-800">
                      <span>✓ Coupon '{appliedCoupon}' Applied (15% OFF)</span>
                      <button
                        type="button"
                        onClick={handleRemoveCoupon}
                        className="text-emerald-700 hover:text-rose-600 cursor-pointer p-0.5"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        placeholder="Enter coupon (try FRESH15)"
                        className="flex-1 px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-mono uppercase focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white"
                      />
                      <button
                        type="button"
                        onClick={handleApplyCoupon}
                        className="px-4 py-2 bg-stone-900 hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                  )}

                  {couponError && (
                    <p className="text-[11px] font-medium text-rose-600">{couponError}</p>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="pt-3 border-t border-stone-100 space-y-2 text-xs">
                  <div className="flex justify-between text-stone-600">
                    <span>Items Subtotal</span>
                    <span className="font-semibold text-stone-900">₹{subtotal}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-medium">
                      <span>Coupon Discount (15%)</span>
                      <span className="font-bold">-₹{discountAmount}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-stone-600">
                    <span>Delivery Fee</span>
                    {isFreeDelivery ? (
                      <span className="font-bold text-emerald-600 uppercase text-[11px]">
                        FREE
                      </span>
                    ) : (
                      <span className="font-semibold text-stone-900">₹{deliveryFee}</span>
                    )}
                  </div>

                  <div className="flex justify-between text-stone-600">
                    <span>GST (5%) & Kitchen Packaging</span>
                    <span className="font-semibold text-stone-900">₹{taxes}</span>
                  </div>

                  <div className="pt-3 border-t border-stone-200 flex justify-between items-baseline">
                    <span className="font-heading font-extrabold text-base text-stone-900">
                      Grand Total
                    </span>
                    <span className="font-heading font-black text-2xl text-orange-600">
                      ₹{grandTotal}
                    </span>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  id="place-order-submit-btn"
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-xl font-bold text-base shadow-lg shadow-orange-600/25 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShieldCheck className="w-5 h-5" />
                  <span>Place Order • ₹{grandTotal}</span>
                </button>

                <p className="text-[11px] text-center text-stone-400">
                  🔒 100% Secure Checkout • Warm delivery guaranteed
                </p>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
