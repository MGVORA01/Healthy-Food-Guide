// src/data/foodData.ts

export interface FoodItem {
  id: number;
  name: string;
  ageGroup: string;
  category: string;
  price: number;
  calories: number;
  protein: string;
  carbs: string;
  fat: string;
  rating: number;
  isHealthy: boolean;
  emoji: string;
  color: string;
  description: string;
  tags: string[];
}

export interface AgeInfo {
  label: string;
  icon: string;
  tip: string;
}

export const foodData: FoodItem[] = [

  // ============ AGE: 0-5 ============
  { id: 1,  name: "Banana Mash",       ageGroup: "0-5",  category: "Breakfast", price: 49,  calories: 89,  protein: "1.1g", carbs: "23g", fat: "0.3g", rating: 4.8, isHealthy: true,  emoji: "🍌", color: "#FFF9C4", description: "Soft, easy-to-digest banana puree rich in potassium and natural sugars for baby energy.", tags: ["soft","sweet","first-food"] },
  { id: 2,  name: "Apple Sauce",       ageGroup: "0-5",  category: "Snacks",    price: 55,  calories: 52,  protein: "0.3g", carbs: "14g", fat: "0.1g", rating: 4.7, isHealthy: true,  emoji: "🍎", color: "#FFEBEE", description: "Smooth homemade apple puree with natural sweetness. No added sugar.", tags: ["fruit","sweet","vitamin-c"] },
  { id: 3,  name: "Carrot Soup",       ageGroup: "0-5",  category: "Lunch",     price: 79,  calories: 41,  protein: "0.9g", carbs: "10g", fat: "0.2g", rating: 4.6, isHealthy: true,  emoji: "🥕", color: "#FFF3E0", description: "Smooth carrot puree soup loaded with beta-carotene for healthy eyes.", tags: ["veggie","smooth","vitamin-a"] },
  { id: 4,  name: "Rice Cereal",       ageGroup: "0-5",  category: "Breakfast", price: 45,  calories: 65,  protein: "1.5g", carbs: "14g", fat: "0.5g", rating: 4.5, isHealthy: true,  emoji: "🍚", color: "#F1F8E9", description: "Fortified rice cereal, a perfect first grain food for babies aged 4-6 months.", tags: ["grain","iron","first-food"] },
  { id: 5,  name: "Sweet Potato Mash", ageGroup: "0-5",  category: "Dinner",    price: 69,  calories: 86,  protein: "1.6g", carbs: "20g", fat: "0.1g", rating: 4.9, isHealthy: true,  emoji: "🍠", color: "#FBE9E7", description: "Creamy sweet potato mash rich in vitamin C, B6 and fiber.", tags: ["veggie","smooth","vitamin-c"] },
  { id: 6,  name: "Pea Puree",         ageGroup: "0-5",  category: "Lunch",     price: 59,  calories: 62,  protein: "4.1g", carbs: "11g", fat: "0.3g", rating: 4.4, isHealthy: true,  emoji: "🟢", color: "#E8F5E9", description: "Green pea puree packed with plant protein and vitamins A, C, and K.", tags: ["protein","green","veggie"] },
  { id: 7,  name: "Oatmeal Porridge",  ageGroup: "0-5",  category: "Breakfast", price: 55,  calories: 71,  protein: "2.5g", carbs: "12g", fat: "1.4g", rating: 4.7, isHealthy: true,  emoji: "🥣", color: "#FFF8E1", description: "Smooth oat porridge, excellent for baby's first solid food stage.", tags: ["grain","warm","fiber"] },
  { id: 8,  name: "Avocado Mash",      ageGroup: "0-5",  category: "Snacks",    price: 89,  calories: 160, protein: "2g",   carbs: "9g",  fat: "15g",  rating: 4.8, isHealthy: true,  emoji: "🥑", color: "#DCEDC8", description: "Creamy avocado mash loaded with healthy fats for brain development.", tags: ["healthy-fat","green","brain-food"] },
  { id: 9,  name: "Spinach Puree",     ageGroup: "0-5",  category: "Dinner",    price: 65,  calories: 23,  protein: "2.9g", carbs: "3.6g",fat: "0.4g", rating: 4.3, isHealthy: true,  emoji: "🌿", color: "#E8F5E9", description: "Iron-rich spinach puree. Best mixed with sweet potato for baby acceptance.", tags: ["iron","green","vitamins"] },
  { id: 10, name: "Pumpkin Soup",      ageGroup: "0-5",  category: "Dinner",    price: 75,  calories: 26,  protein: "1g",   carbs: "6g",  fat: "0.1g", rating: 4.6, isHealthy: true,  emoji: "🎃", color: "#FFF3E0", description: "Silky smooth pumpkin soup. High in vitamin A, great for immunity.", tags: ["smooth","vitamin-a","veggie"] },

  // ============ AGE: 6-10 ============
  { id: 11, name: "Peanut Butter Toast", ageGroup: "6-10", category: "Breakfast", price: 59,  calories: 190, protein: "8g",   carbs: "18g", fat: "11g",  rating: 4.9, isHealthy: true,  emoji: "🍞", color: "#FFF8E1", description: "Whole grain toast with natural peanut butter. Great protein for growing kids.", tags: ["protein","energy","breakfast"] },
  { id: 12, name: "Fruit Kebabs",       ageGroup: "6-10", category: "Snacks",    price: 79,  calories: 75,  protein: "1g",   carbs: "18g", fat: "0.5g", rating: 4.8, isHealthy: true,  emoji: "🍢", color: "#FCE4EC", description: "Colorful skewers with strawberry, melon, grapes and pineapple. Kids love these!", tags: ["fun","fruit","colorful"] },
  { id: 13, name: "Veggie Pasta",       ageGroup: "6-10", category: "Lunch",     price: 99,  calories: 220, protein: "9g",   carbs: "40g", fat: "3g",   rating: 4.7, isHealthy: true,  emoji: "🍝", color: "#FFF3E0", description: "Whole wheat pasta with hidden veggie tomato sauce. Kids won't even notice!", tags: ["pasta","hidden-veggies","lunch"] },
  { id: 14, name: "Cheese Sandwich",    ageGroup: "6-10", category: "Lunch",     price: 69,  calories: 280, protein: "12g",  carbs: "26g", fat: "14g",  rating: 4.6, isHealthy: true,  emoji: "🥪", color: "#FFF9C4", description: "Multigrain sandwich with cheddar cheese, cucumber and lettuce.", tags: ["calcium","lunch","easy"] },
  { id: 15, name: "Banana Pancakes",    ageGroup: "6-10", category: "Breakfast", price: 89,  calories: 195, protein: "5g",   carbs: "35g", fat: "4g",   rating: 4.9, isHealthy: true,  emoji: "🥞", color: "#FFF8E1", description: "2-ingredient banana oat pancakes. No added sugar, naturally sweet.", tags: ["breakfast","sweet","easy"] },
  { id: 16, name: "Cottage Cheese Bowl",ageGroup: "6-10", category: "Snacks",    price: 75,  calories: 120, protein: "14g",  carbs: "5g",  fat: "5g",   rating: 4.5, isHealthy: true,  emoji: "🫙", color: "#E3F2FD", description: "Cottage cheese topped with fresh pineapple and a drizzle of honey.", tags: ["protein","calcium","snack"] },
  { id: 17, name: "Egg Fried Rice",     ageGroup: "6-10", category: "Dinner",    price: 89,  calories: 260, protein: "10g",  carbs: "38g", fat: "8g",   rating: 4.8, isHealthy: true,  emoji: "🍳", color: "#FFF9C4", description: "Brown rice stir fried with egg, peas and carrots. Quick and nutritious.", tags: ["rice","protein","dinner"] },
  { id: 18, name: "Sweet Potato Fries", ageGroup: "6-10", category: "Snacks",    price: 79,  calories: 150, protein: "2g",   carbs: "28g", fat: "4g",   rating: 4.7, isHealthy: true,  emoji: "🍟", color: "#FBE9E7", description: "Baked sweet potato fries. A healthy twist on every kid's favorite snack.", tags: ["baked","veggie","kids-love"] },

  // ============ AGE: 11-15 ============
  { id: 19, name: "Grilled Chicken Wrap", ageGroup: "11-15", category: "Lunch",     price: 129, calories: 340, protein: "28g",  carbs: "32g", fat: "9g",   rating: 4.8, isHealthy: true,  emoji: "🌯", color: "#F1F8E9", description: "Whole wheat wrap with grilled chicken, avocado, lettuce and yogurt sauce.", tags: ["protein","lunch","teen"] },
  { id: 20, name: "Protein Smoothie",   ageGroup: "11-15", category: "Breakfast", price: 109, calories: 280, protein: "18g",  carbs: "35g", fat: "6g",   rating: 4.9, isHealthy: true,  emoji: "🥤", color: "#FCE4EC", description: "Banana, peanut butter, milk and oats blended into a power-packed smoothie.", tags: ["protein","energy","teen"] },
  { id: 21, name: "Quinoa Salad",       ageGroup: "11-15", category: "Lunch",     price: 119, calories: 220, protein: "8g",   carbs: "35g", fat: "7g",   rating: 4.6, isHealthy: true,  emoji: "🥗", color: "#E8F5E9", description: "Quinoa with cucumber, cherry tomatoes, feta and olive oil dressing.", tags: ["protein","salad","refreshing"] },
  { id: 22, name: "Overnight Oats",     ageGroup: "11-15", category: "Breakfast", price: 89,  calories: 310, protein: "12g",  carbs: "48g", fat: "8g",   rating: 4.7, isHealthy: true,  emoji: "🫙", color: "#FFF8E1", description: "Oats soaked overnight with chia seeds, almond milk and topped with berries.", tags: ["fiber","breakfast","easy-prep"] },
  { id: 23, name: "Stir Fry Veggies",   ageGroup: "11-15", category: "Dinner",    price: 109, calories: 180, protein: "6g",   carbs: "22g", fat: "7g",   rating: 4.5, isHealthy: true,  emoji: "🥦", color: "#E8F5E9", description: "Broccoli, bell pepper, snap peas stir fried in sesame-ginger sauce.", tags: ["veggie","dinner","iron"] },
  { id: 24, name: "Boiled Egg Plate",   ageGroup: "11-15", category: "Snacks",    price: 69,  calories: 155, protein: "13g",  carbs: "1g",  fat: "11g",  rating: 4.6, isHealthy: true,  emoji: "🥚", color: "#FFF9C4", description: "2 boiled eggs with a pinch of salt, pepper and a side of cherry tomatoes.", tags: ["protein","quick","snack"] },
  { id: 25, name: "Dal Rice Bowl",      ageGroup: "11-15", category: "Dinner",    price: 99,  calories: 380, protein: "15g",  carbs: "60g", fat: "6g",   rating: 4.8, isHealthy: true,  emoji: "🍲", color: "#FFF3E0", description: "Yellow dal with rice, rich in plant protein and comforting for growing teens.", tags: ["protein","comfort","indian"] },

  // ============ AGE: 16-20 ============
  { id: 26, name: "Avocado Toast",      ageGroup: "16-20", category: "Breakfast", price: 119, calories: 290, protein: "8g",   carbs: "26g", fat: "18g",  rating: 4.9, isHealthy: true,  emoji: "🥑", color: "#DCEDC8", description: "Sourdough toast topped with mashed avocado, cherry tomatoes and chilli flakes.", tags: ["healthy-fat","trendy","breakfast"] },
  { id: 27, name: "Chicken Bowl",       ageGroup: "16-20", category: "Lunch",     price: 149, calories: 450, protein: "35g",  carbs: "42g", fat: "12g",  rating: 4.8, isHealthy: true,  emoji: "🍗", color: "#FFF3E0", description: "Grilled chicken over brown rice with roasted veggies and tahini sauce.", tags: ["protein","meal-prep","filling"] },
  { id: 28, name: "Green Smoothie",     ageGroup: "16-20", category: "Snacks",    price: 99,  calories: 190, protein: "5g",   carbs: "30g", fat: "5g",   rating: 4.7, isHealthy: true,  emoji: "🥬", color: "#E8F5E9", description: "Spinach, banana, apple, ginger and coconut water blended smooth.", tags: ["detox","green","energy"] },
  { id: 29, name: "Oats & Berries",     ageGroup: "16-20", category: "Breakfast", price: 99,  calories: 320, protein: "10g",  carbs: "55g", fat: "7g",   rating: 4.7, isHealthy: true,  emoji: "🫐", color: "#EDE7F6", description: "Steel-cut oats topped with blueberries, strawberries and a drizzle of honey.", tags: ["fiber","antioxidant","breakfast"] },
  { id: 30, name: "Grilled Salmon",     ageGroup: "16-20", category: "Dinner",    price: 199, calories: 367, protein: "39g",  carbs: "0g",  fat: "22g",  rating: 4.9, isHealthy: true,  emoji: "🐟", color: "#E3F2FD", description: "Grilled salmon fillet with lemon herb sauce and steamed broccoli on the side.", tags: ["omega-3","protein","premium"] },
  { id: 31, name: "Hummus Veggie Plate",ageGroup: "16-20", category: "Snacks",    price: 109, calories: 200, protein: "7g",   carbs: "24g", fat: "9g",   rating: 4.6, isHealthy: true,  emoji: "🫘", color: "#FFF9C4", description: "Creamy hummus served with carrots, cucumber, bell pepper and pita triangles.", tags: ["snack","veggie","fiber"] },

  // ============ AGE: 21+ ============
  { id: 32, name: "Buddha Bowl",        ageGroup: "21+",   category: "Lunch",     price: 159, calories: 420, protein: "18g",  carbs: "52g", fat: "14g",  rating: 4.9, isHealthy: true,  emoji: "🥙", color: "#F1F8E9", description: "Quinoa, roasted sweet potato, chickpeas, kale, avocado and lemon tahini.", tags: ["balanced","colorful","vegan"] },
  { id: 33, name: "Green Detox Juice",  ageGroup: "21+",   category: "Breakfast", price: 129, calories: 95,  protein: "2g",   carbs: "22g", fat: "0.5g", rating: 4.7, isHealthy: true,  emoji: "🥒", color: "#E8F5E9", description: "Cold-pressed cucumber, celery, spinach, lemon and ginger. Resets your gut.", tags: ["detox","juice","cleanse"] },
  { id: 34, name: "Salmon Poke Bowl",   ageGroup: "21+",   category: "Lunch",     price: 199, calories: 490, protein: "30g",  carbs: "48g", fat: "18g",  rating: 4.8, isHealthy: true,  emoji: "🫙", color: "#E3F2FD", description: "Fresh salmon, rice, edamame, mango, avocado and spicy mayo.", tags: ["omega-3","premium","trendy"] },
  { id: 35, name: "Chia Pudding",       ageGroup: "21+",   category: "Breakfast", price: 99,  calories: 210, protein: "9g",   carbs: "28g", fat: "10g",  rating: 4.8, isHealthy: true,  emoji: "🍮", color: "#EDE7F6", description: "Overnight chia pudding with almond milk, topped with mango and coconut flakes.", tags: ["fiber","omega-3","prep-ahead"] },
  { id: 36, name: "Lentil Curry",       ageGroup: "21+",   category: "Dinner",    price: 139, calories: 350, protein: "18g",  carbs: "52g", fat: "8g",   rating: 4.7, isHealthy: true,  emoji: "🍛", color: "#FFF3E0", description: "Red lentil curry with spinach, coconut milk and spiced with turmeric and cumin.", tags: ["protein","vegan","indian"] },
  { id: 37, name: "Walnut Energy Balls",ageGroup: "21+",   category: "Snacks",    price: 89,  calories: 145, protein: "4g",   carbs: "15g", fat: "9g",   rating: 4.6, isHealthy: true,  emoji: "🫐", color: "#EFEBE9", description: "Bliss balls made from dates, walnuts, oats and cocoa. Zero refined sugar.", tags: ["energy","snack","no-bake"] },
  { id: 38, name: "Mediterranean Salad",ageGroup: "21+",   category: "Lunch",     price: 149, calories: 260, protein: "7g",   carbs: "18g", fat: "18g",  rating: 4.8, isHealthy: true,  emoji: "🥗", color: "#E8F5E9", description: "Romaine, feta, olives, cucumbers, red onion and classic Greek dressing.", tags: ["salad","mediterranean","light"] },
];

export const ageGroups: string[] = ["0-5", "6-10", "11-15", "16-20", "21+"];

export const categories: string[] = ["All", "Breakfast", "Lunch", "Dinner", "Snacks"];

export const ageInfo: Record<string, AgeInfo> = {
  "0-5":  { label: "0–5 Years",  icon: "👶", tip: "Soft, puree-based foods rich in iron, calcium and healthy fats for brain development." },
  "6-10": { label: "6–10 Years", icon: "🧒", tip: "Fun, colorful foods with balanced protein and carbs for active, growing kids." },
  "11-15":{ label: "11–15 Years",icon: "🧑", tip: "Higher protein and iron for rapid growth, bone density and teen energy levels." },
  "16-20":{ label: "16–20 Years",icon: "👦", tip: "Nutrient-dense meals supporting muscle growth, hormones and high activity." },
  "21+":  { label: "21+ Years",  icon: "🧑‍💼", tip: "Balanced whole foods focusing on heart health, metabolism and long-term wellness." },
};

export const POLLS = [
  { question: "Which is a better breakfast?", a: { label: "Oatmeal 🥣", tip: "High fiber, keeps you full" }, b: { label: "Banana Pancakes 🥞", tip: "Natural energy boost" } },
  { question: "Better protein source?",        a: { label: "Boiled Eggs 🥚", tip: "Complete protein, all amino acids" }, b: { label: "Peanut Butter 🥜", tip: "Plant protein + healthy fats" } },
  { question: "Best hydrating food?",          a: { label: "Cucumber 🥒", tip: "96% water content" }, b: { label: "Watermelon 🍉", tip: "92% water + antioxidants" } },
];

export const HOW_IT_WORKS = [
  { emoji: "1️⃣", title: "Choose Your Age", desc: "Select your age group to see foods specially recommended for you." },
  { emoji: "2️⃣", title: "Pick Your Food",  desc: "Browse healthy meals, snacks and drinks matched to your nutrition needs." },
  { emoji: "3️⃣", title: "Order & Earn",    desc: "Place your order and earn points, streaks and badges for healthy choices!" },
];

export const CATEGORIES = [
  { emoji: "🌅", label: "Breakfast" }, { emoji: "☀️", label: "Lunch" },
  { emoji: "🌙", label: "Dinner" },    { emoji: "🍎", label: "Snacks" },
];