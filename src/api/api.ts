export const API = import.meta.env.VITE_API_URL || 'http://localhost:3001';


// Define interfaces for your data
export interface Food {
  id: number;
  name: string;
  ageGroup: string;
  // add other fields from your db.json
}

export interface LeaderboardEntry {
  id: number;
  name: string;
  score: number;
}

export interface Badge {
  id: number;
  title: string;
  icon: string;
}

// get all foods
export async function getAllFoods(): Promise<Food[]> {
  const res = await fetch(`${API}/foods`);
  return res.json();
}

// get foods by age group
export async function getFoodsByAge(ageGroup: string): Promise<Food[]> {
  const res = await fetch(`${API}/foods?ageGroup=${ageGroup}`);
  return res.json();
}

// get leaderboard
export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  const res = await fetch(`${API}/leaderboard`);
  return res.json();
}

// get badges
export async function getBadges(): Promise<Badge[]> {
  const res = await fetch(`${API}/badges`);
  return res.json();
}