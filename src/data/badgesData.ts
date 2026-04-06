
export interface Badge {
  id: string;
  emoji: string;
  name: string;
  description: string;
  condition: string;
}

export interface Level {
  level: number;
  name: string;
  emoji: string;
  minPoints: number;
  maxPoints: number;
}

export const badgesData: Badge[] = [
  { id: "first_order",  emoji: "🎉", name: "First Order",     description: "Placed your very first order!",              condition: "Place 1 order" },
  { id: "veggie_lover", emoji: "🥦", name: "Veggie Lover",    description: "Ordered 5 vegetable-based foods.",           condition: "Order 5 veggie items" },
  { id: "streak_7",     emoji: "🔥", name: "7 Day Streak",    description: "Ordered healthy food 7 days in a row!",      condition: "7 day streak" },
  { id: "cart_master",  emoji: "🛒", name: "Cart Master",     description: "Added 20 items to cart total.",              condition: "Add 20 items to cart" },
  { id: "age_explorer", emoji: "🧭", name: "Age Explorer",    description: "Ordered food from all 5 age groups!",        condition: "Try all age groups" },
  { id: "new_taster",   emoji: "🍽️", name: "New Taster",      description: "Tried 10 different foods.",                  condition: "Order 10 unique foods" },
  { id: "healthy_week", emoji: "🌟", name: "Healthy Week",    description: "Ordered healthy food every day for a week.", condition: "7 healthy orders in 7 days" },
  { id: "level_up",     emoji: "⬆️", name: "Level Up!",       description: "Reached Level 2 or above.",                 condition: "Reach Level 2" },
  { id: "streak_3",     emoji: "✨", name: "3 Day Streak",    description: "Ordered healthy food 3 days in a row!",      condition: "3 day streak" },
  { id: "wishlist_fan", emoji: "❤️", name: "Wishlist Fan",    description: "Saved 5 items to your wishlist.",            condition: "Save 5 items" },
];

export const levels: Level[] = [
  { level: 1, name: "Beginner",      emoji: "🌱", minPoints: 0,   maxPoints: 50   },
  { level: 2, name: "Healthy Eater", emoji: "🥗", minPoints: 51,  maxPoints: 150  },
  { level: 3, name: "Nutrition Pro", emoji: "💪", minPoints: 151, maxPoints: 300  },
  { level: 4, name: "Health Guru",   emoji: "🏆", minPoints: 301, maxPoints: 500  },
  { level: 5, name: "Legend",        emoji: "👑", minPoints: 501, maxPoints: 9999 },
];

export const getLevelInfo = (points: number): Level => {
  return levels.find(l => points >= l.minPoints && points <= l.maxPoints) || levels[0];
};

export const getNextLevel = (points: number): Level | null => {
  const current = getLevelInfo(points);
  return levels.find(l => l.level === current.level + 1) || null;
};
