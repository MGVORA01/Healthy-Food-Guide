import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface PointsHistoryEntry {
  pts: number;
  reason: string;
  date: string;
}

export interface User {
  id?: string | number;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  selectedAge?: string;
  totalPoints?: number;
  currentStreak?: number;
  longestStreak?: number;
  lastOrderDate?: string | null;
  earnedBadges?: string[];
  totalOrders?: number;
  weeklyOrders?: number[];
  createdAt?: string;
  pointsHistory?: PointsHistoryEntry[];
}

interface AuthState {
  currentUser: User | null;
}

const getSavedUser = (): User | null => {
  const saved = localStorage.getItem('hfg_current_user');
  return saved ? (JSON.parse(saved) as User) : null;
};

const initialState: AuthState = {
  currentUser: getSavedUser(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    clearCurrentUser: state => {
      state.currentUser = null;
    },
    mergeCurrentUser: (state, action: PayloadAction<Partial<User>>) => {
      if (!state.currentUser) return;
      state.currentUser = { ...state.currentUser, ...action.payload };
    },
  },
});

export const { setCurrentUser, clearCurrentUser, mergeCurrentUser } = authSlice.actions;
export default authSlice.reducer;
