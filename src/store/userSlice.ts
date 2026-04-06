import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { badgesData } from '../data/badgesData';
import type { User } from './authSlice';

export interface PointsEntry {
  pts: number;
  reason: string;
  date: string;
}

export interface OrderItem {
  ageGroup: string;
  category: string;
  tags?: string[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon?: string;
}

interface UserState {
  userName: string;
  totalPoints: number;
  currentStreak: number;
  longestStreak: number;
  earnedBadges: string[];
  totalOrders: number;
  weeklyOrders: number[];
  selectedAge: string;
  newBadge: Badge | null;
  pointsHistory: PointsEntry[];
  lastOrderDate: string | null;
}

const initialState: UserState = {
  userName: 'Guest',
  totalPoints: 0,
  currentStreak: 0,
  longestStreak: 0,
  earnedBadges: [],
  totalOrders: 0,
  weeklyOrders: [0, 0, 0, 0, 0, 0, 0],
  selectedAge: '21+',
  newBadge: null,
  pointsHistory: [],
  lastOrderDate: null,
};

const applyUser = (state: UserState, user: User | null) => {
  if (!user) {
    Object.assign(state, initialState);
    return;
  }

  state.userName = user.name || 'Guest';
  state.totalPoints = user.totalPoints || 0;
  state.currentStreak = user.currentStreak || 0;
  state.longestStreak = user.longestStreak || 0;
  state.earnedBadges = user.earnedBadges || [];
  state.totalOrders = user.totalOrders || 0;
  state.weeklyOrders = user.weeklyOrders || [0, 0, 0, 0, 0, 0, 0];
  state.selectedAge = user.selectedAge || '21+';
  state.pointsHistory = user.pointsHistory || [];
  state.lastOrderDate = user.lastOrderDate || null;
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    syncFromAuthUser: (state, action: PayloadAction<User | null>) => {
      applyUser(state, action.payload);
    },
    setUserNameLocal: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
    setSelectedAgeLocal: (state, action: PayloadAction<string>) => {
      state.selectedAge = action.payload;
    },
    addPointsLocal: (state, action: PayloadAction<PointsEntry>) => {
      state.totalPoints += action.payload.pts;
      state.pointsHistory = [action.payload, ...state.pointsHistory].slice(0, 50);
    },
    unlockBadgeLocal: (state, action: PayloadAction<string>) => {
      if (state.earnedBadges.includes(action.payload)) return;
      state.earnedBadges = [...state.earnedBadges, action.payload];
      const badge = badgesData.find(b => b.id === action.payload);
      state.newBadge = badge || null;
    },
    dismissNewBadgeLocal: state => {
      state.newBadge = null;
    },
    setStreakLocal: (
      state,
      action: PayloadAction<{
        currentStreak: number;
        longestStreak: number;
        lastOrderDate: string;
      }>
    ) => {
      state.currentStreak = action.payload.currentStreak;
      state.longestStreak = action.payload.longestStreak;
      state.lastOrderDate = action.payload.lastOrderDate;
    },
    setTotalOrdersLocal: (state, action: PayloadAction<number>) => {
      state.totalOrders = action.payload;
    },
  },
});

export const {
  syncFromAuthUser,
  setUserNameLocal,
  setSelectedAgeLocal,
  addPointsLocal,
  unlockBadgeLocal,
  dismissNewBadgeLocal,
  setStreakLocal,
  setTotalOrdersLocal,
} = userSlice.actions;

export default userSlice.reducer;
