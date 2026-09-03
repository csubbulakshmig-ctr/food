export type Category = 'All' | 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks' | 'Beverages';

export type FoodCategory = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks' | 'Beverages';

export interface FoodItem {
  id: string;
  name: string;
  tamilName?: string;
  description: string;
  price: number;
  rating: number;
  reviewCount: number;
  category: FoodCategory;
  isVeg: boolean;
  imageUrl: string;
  isPopular?: boolean;
  prepTime?: string;
}

export interface CartItem {
  item: FoodItem;
  quantity: number;
}

export interface User {
  fullName: string;
  email: string;
  phone: string;
}

export type Page = 'home' | 'menu' | 'cart' | 'about' | 'contact' | 'login' | 'signup';
