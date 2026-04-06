import { useCallback, useEffect } from 'react';
import { getLevelInfo } from '../data/badgesData';
import { useAuth } from '../hooks/useAuth';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { store } from '../store';
import {
  addPointsLocal,
  dismissNewBadgeLocal,
  setSelectedAgeLocal,
  setStreakLocal,
  setTotalOrdersLocal,
  setUserNameLocal,
  syncFromAuthUser,
  unlockBadgeLocal,
  type Badge,
  type OrderItem,
  type PointsEntry,
} from '../store/userSlice';

interface UserContextType {
  userName: string;
  setUserName: (name: string) => void;

  totalPoints: number;
  levelInfo: ReturnType<typeof getLevelInfo>;

  currentStreak: number;
  longestStreak: number;

  earnedBadges: string[];
  weeklyOrders: number[];

  selectedAge: string;
  setSelectedAge: (age: string) => void;

  totalOrders: number;

  newBadge: Badge | null;
  dismissNewBadge: () => void;

  addPoints: (pts: number, reason?: string) => void;
  unlockBadge: (badgeId: string) => void;
  placeOrder: (items: OrderItem[], userAgeGroup: string) => number;
  updateStreak: () => void;

  incrementCartAdds: () => void;
  addToWishlistPoints: () => void;

  pointsHistory: PointsEntry[];
}

interface UserAgeHook {
  selectedAge: string;
  setSelectedAge: (age: string) => void;
}

export const useUser = (): UserContextType => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(state => state.auth.currentUser);
  const {
    userName,
    totalPoints,
    currentStreak,
    longestStreak,
    earnedBadges,
    weeklyOrders,
    selectedAge,
    totalOrders,
    newBadge,
    pointsHistory,
    lastOrderDate,
  } = useAppSelector(state => state.user);
  const { updateUser } = useAuth();

  useEffect(() => {
    dispatch(syncFromAuthUser(currentUser));
  }, [currentUser, dispatch]);

  const levelInfo = getLevelInfo(totalPoints);

  const setUserName = useCallback(
    (name: string) => {
      dispatch(setUserNameLocal(name));
      void updateUser({ name });
    },
    [dispatch, updateUser]
  );

  const setSelectedAge = useCallback(
    (age: string) => {
      dispatch(setSelectedAgeLocal(age));
      void updateUser({ selectedAge: age });
    },
    [dispatch, updateUser]
  );

  const addPoints = useCallback(
    (pts: number, reason = 'Bonus points') => {
      const entry: PointsEntry = {
        pts,
        reason,
        date: new Date().toLocaleDateString(),
      };

      const newTotal = totalPoints + pts;
      const updatedHistory = [entry, ...pointsHistory].slice(0, 50);

      dispatch(addPointsLocal(entry));
      void updateUser({ totalPoints: newTotal, pointsHistory: updatedHistory });
    },
    [dispatch, pointsHistory, totalPoints, updateUser]
  );

  const unlockBadge = useCallback(
    (badgeId: string) => {
      if (earnedBadges.includes(badgeId)) return;

      dispatch(unlockBadgeLocal(badgeId));
      const updatedBadges = [...earnedBadges, badgeId];
      void updateUser({ earnedBadges: updatedBadges });
    },
    [dispatch, earnedBadges, updateUser]
  );

  const updateStreak = useCallback(() => {
    const today = new Date().toDateString();
    if (lastOrderDate === today) return;

    const yesterday = new Date(Date.now() - 86400000).toDateString();
    const isConsecutive = lastOrderDate === yesterday;

    const newStreak = isConsecutive ? currentStreak + 1 : 1;
    const newLongest = Math.max(longestStreak, newStreak);

    dispatch(
      setStreakLocal({
        currentStreak: newStreak,
        longestStreak: newLongest,
        lastOrderDate: today,
      })
    );

    void updateUser({
      currentStreak: newStreak,
      longestStreak: newLongest,
      lastOrderDate: today,
    });
  }, [currentStreak, dispatch, lastOrderDate, longestStreak, updateUser]);

  const placeOrder = useCallback(
    (items: OrderItem[], userAgeGroup: string) => {
      let pts = 10;

      const ageMatches = items.filter(i => i.ageGroup === userAgeGroup).length;
      if (ageMatches > 0) pts += 15;

      const categories = new Set(items.map(i => i.category));
      if (categories.size >= 3) pts += 20;

      addPoints(pts, `Order placed (+${pts} pts)`);
      updateStreak();

      const newTotalOrders = totalOrders + 1;
      dispatch(setTotalOrdersLocal(newTotalOrders));
      void updateUser({ totalOrders: newTotalOrders });

      return pts;
    },
    [addPoints, dispatch, totalOrders, updateStreak, updateUser]
  );

  const incrementCartAdds = useCallback(() => addPoints(2, 'Added item to cart'), [addPoints]);
  const addToWishlistPoints = useCallback(() => addPoints(2, 'Added item to wishlist'), [addPoints]);
  const dismissNewBadge = useCallback(() => dispatch(dismissNewBadgeLocal()), [dispatch]);

  return {
    userName,
    setUserName,
    totalPoints,
    levelInfo,
    currentStreak,
    longestStreak,
    earnedBadges,
    weeklyOrders,
    selectedAge,
    setSelectedAge,
    totalOrders,
    newBadge,
    dismissNewBadge,
    addPoints,
    unlockBadge,
    placeOrder,
    updateStreak,
    incrementCartAdds,
    addToWishlistPoints,
    pointsHistory,
  };
};

export const useUserAge = (): UserAgeHook => {
  const dispatch = useAppDispatch();
  const selectedAge = useAppSelector(state => state.user.selectedAge);
  const { updateUser } = useAuth();

  const setSelectedAge = useCallback(
    (age: string) => {
      dispatch(setSelectedAgeLocal(age));
      void updateUser({ selectedAge: age });
    },
    [dispatch, updateUser]
  );

  return {
    selectedAge,
    setSelectedAge,
  };
};

const API = 'http://localhost:3001';

interface UserRewardActions {
  incrementCartAdds: () => void;
  addToWishlistPoints: () => void;
}

// NEW:
export const useUserRewardActions = (): UserRewardActions => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(state => state.auth.currentUser?.id);

  const addPoints = useCallback(
    (pts: number, reason: string) => {
      // Delay dispatch so it doesn't re-render during the click handler
      setTimeout(() => {
        const state = store.getState();
        const entry: PointsEntry = {
          pts,
          reason,
          date: new Date().toLocaleDateString(),
        };

        const newTotal = state.user.totalPoints + pts;
        const updatedHistory = [entry, ...state.user.pointsHistory].slice(0, 50);
        dispatch(addPointsLocal(entry));

        if (userId === undefined) return;

        void fetch(`${API}/users/${userId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            totalPoints: newTotal,
            pointsHistory: updatedHistory,
          }),
        });
      }, 300); // small delay — after toast starts, away from click event
    },
    [dispatch, userId]
  );

  const incrementCartAdds = useCallback(() => addPoints(2, 'Added item to cart'), [addPoints]);
  const addToWishlistPoints = useCallback(() => addPoints(2, 'Added item to wishlist'), [addPoints]);

  return { incrementCartAdds, addToWishlistPoints };
};