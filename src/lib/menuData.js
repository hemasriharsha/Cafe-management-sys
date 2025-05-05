
import { Coffee, CakeSlice, Utensils, Pizza, IceCream, Soup, Salad, Beer } from "lucide-react";

export const menuItems = [
  // Hot Beverages
  { id: 1, name: "Masala Chai", price: 30, category: "Hot Beverages", icon: Coffee },
  { id: 2, name: "Filter Coffee", price: 40, category: "Hot Beverages", icon: Coffee },
  { id: 3, name: "Espresso", price: 80, category: "Hot Beverages", icon: Coffee },
  { id: 4, name: "Cappuccino", price: 120, category: "Hot Beverages", icon: Coffee },
  { id: 5, name: "Cafe Latte", price: 130, category: "Hot Beverages", icon: Coffee },
  { id: 6, name: "Green Tea", price: 60, category: "Hot Beverages", icon: Coffee },
  { id: 7, name: "Herbal Tea", price: 70, category: "Hot Beverages", icon: Coffee },
  { id: 8, name: "Hot Chocolate", price: 140, category: "Hot Beverages", icon: Coffee },
  
  // Cold Beverages
  { id: 9, name: "Cold Coffee", price: 120, category: "Cold Beverages", icon: Coffee },
  { id: 10, name: "Iced Latte", price: 140, category: "Cold Beverages", icon: Coffee },
  { id: 11, name: "Mango Smoothie", price: 150, category: "Cold Beverages", icon: IceCream },
  { id: 12, name: "Berry Blast", price: 160, category: "Cold Beverages", icon: IceCream },
  { id: 13, name: "Fresh Lime Soda", price: 80, category: "Cold Beverages", icon: Beer },
  { id: 14, name: "Virgin Mojito", price: 130, category: "Cold Beverages", icon: Beer },
  { id: 15, name: "Iced Tea", price: 90, category: "Cold Beverages", icon: Coffee },
  
  // Pastries
  { id: 16, name: "Butter Croissant", price: 90, category: "Pastries", icon: CakeSlice },
  { id: 17, name: "Chocolate Muffin", price: 60, category: "Pastries", icon: CakeSlice },
  { id: 18, name: "Blueberry Muffin", price: 70, category: "Pastries", icon: CakeSlice },
  { id: 19, name: "Danish Pastry", price: 85, category: "Pastries", icon: CakeSlice },
  { id: 20, name: "Cinnamon Roll", price: 95, category: "Pastries", icon: CakeSlice },
  { id: 21, name: "Apple Pie", price: 110, category: "Pastries", icon: CakeSlice },
  { id: 22, name: "Chocolate Brownie", price: 80, category: "Pastries", icon: CakeSlice },
  
  // Quick Bites
  { id: 23, name: "Veg Sandwich", price: 120, category: "Quick Bites", icon: Utensils },
  { id: 24, name: "Grilled Cheese", price: 140, category: "Quick Bites", icon: Utensils },
  { id: 25, name: "Paneer Tikka", price: 180, category: "Quick Bites", icon: Utensils },
  { id: 26, name: "French Fries", price: 100, category: "Quick Bites", icon: Utensils },
  { id: 27, name: "Nachos", price: 160, category: "Quick Bites", icon: Utensils },
  { id: 28, name: "Cheese Balls", price: 130, category: "Quick Bites", icon: Utensils },
  
  // Main// Main Course
  { id: 29, name: "Veg Biryani", price: 220, category: "Main Course", icon: Utensils },
  { id: 30, name: "Butter Paneer", price: 240, category: "Main Course", icon: Utensils },
  { id: 31, name: "Dal Makhani", price: 180, category: "Main Course", icon: Utensils },
  { id: 32, name: "Veg Pulao", price: 160, category: "Main Course", icon: Utensils },
  { id: 33, name: "Jeera Rice", price: 140, category: "Main Course", icon: Utensils },
  
  // Pizza
  { id: 34, name: "Margherita", price: 200, category: "Pizza", icon: Pizza },
  { id: 35, name: "Veggie Supreme", price: 280, category: "Pizza", icon: Pizza },
  { id: 36, name: "Paneer Pizza", price: 260, category: "Pizza", icon: Pizza },
  { id: 37, name: "Mushroom Pizza", price: 240, category: "Pizza", icon: Pizza },
  
  // Soups
  { id: 38, name: "Tomato Soup", price: 120, category: "Soups", icon: Soup },
  { id: 39, name: "Sweet Corn", price: 130, category: "Soups", icon: Soup },
  { id: 40, name: "Manchow Soup", price: 140, category: "Soups", icon: Soup },
  
  // Salads
  { id: 41, name: "Caesar Salad", price: 180, category: "Salads", icon: Salad },
  { id: 42, name: "Greek Salad", price: 190, category: "Salads", icon: Salad },
  { id: 43, name: "Garden Salad", price: 150, category: "Salads", icon: Salad },
  
  // Desserts
  { id: 44, name: "Ice Cream", price: 100, category: "Desserts", icon: IceCream },
  { id: 45, name: "Gulab Jamun", price: 80, category: "Desserts", icon: CakeSlice },
  { id: 46, name: "Chocolate Sundae", price: 160, category: "Desserts", icon: IceCream },
  { id: 47, name: "Rasmalai", price: 90, category: "Desserts", icon: CakeSlice },
  { id: 48, name: "Cheesecake", price: 180, category: "Desserts", icon: CakeSlice },
  { id: 49, name: "Tiramisu", price: 200, category: "Desserts", icon: CakeSlice },
  { id: 50, name: "Fruit Trifle", price: 150, category: "Desserts", icon: CakeSlice }
];

export const categoryColors = {
  "Hot Beverages": "from-amber-100 to-amber-50",
  "Cold Beverages": "from-blue-100 to-blue-50",
  "Pastries": "from-pink-100 to-pink-50",
  "Quick Bites": "from-green-100 to-green-50",
  "Main Course": "from-orange-100 to-orange-50",
  "Pizza": "from-red-100 to-red-50",
  "Soups": "from-yellow-100 to-yellow-50",
  "Salads": "from-emerald-100 to-emerald-50",
  "Desserts": "from-purple-100 to-purple-50"
};
