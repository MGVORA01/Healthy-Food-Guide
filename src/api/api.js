// src/api/api.js
const BASE = "http://localhost:3001";

// get all foods
export async function getAllFoods() {
  const res = await fetch(`${BASE}/foods`);
  return res.json();
}

// get foods by age group — e.g. "0-5", "6-10"
export async function getFoodsByAge(ageGroup) {
  const res = await fetch(`${BASE}/foods?ageGroup=${ageGroup}`);
  return res.json();
}

// get leaderboard
export async function getLeaderboard() {
  const res = await fetch(`${BASE}/leaderboard`);
  return res.json();
}

// get badges
export async function getBadges() {
  const res = await fetch(`${BASE}/badges`);
  return res.json();
}