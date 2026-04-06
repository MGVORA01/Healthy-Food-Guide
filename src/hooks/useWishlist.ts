import { useCallback, useEffect } from 'react';
import { useAuth } from './useAuth';
import type { FoodItem } from '../data/foodData';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  addWishlistItem,
  clearWishlistItems,
  removeWishlistByItemId,
  replaceWishlistItem,
  setWishlistItems,
  type WishlistItem,
} from '../store/wishlistSlice';
import { API } from '../api/api';

export type { WishlistItem };

interface WishlistHook {
  wishlist: WishlistItem[];
  wishlistCount: number;
  addToWishlist: (item: FoodItem) => Promise<void>;
  removeFromWishlist: (itemId: number) => Promise<void>;
  isInWishlist: (itemId: number) => boolean;
}

export const useWishlist = (): WishlistHook => {
  const dispatch = useAppDispatch();
  const wishlist = useAppSelector((state) => state.wishlist.wishlist);
  const { currentUser, isLoggedIn } = useAuth();
  const userId = currentUser?.id;

  const loadWishlist = useCallback(async (): Promise<void> => {
    if (!currentUser) return;
    try {
      const res = await fetch(`${API}/wishlists?userId=${userId}`);
      const data = (await res.json()) as WishlistItem[];
      dispatch(setWishlistItems(data));
    } catch (err) {
      console.error('Failed to load wishlist', err);
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (isLoggedIn && userId !== undefined) {
      void loadWishlist();
    } else {
      dispatch(clearWishlistItems());
    }
  }, [dispatch, isLoggedIn, loadWishlist, userId]);

  const addToWishlist = useCallback(
    async (item: FoodItem): Promise<void> => {
      if (!isLoggedIn || userId === undefined || !currentUser) return;

      const { id: foodId, ...foodItem } = item;
      if (wishlist.some((w) => w.itemId === foodId)) return;

      const tempId = Date.now();
      const tempItem: WishlistItem = {
        ...foodItem,
        id: tempId,
          userId: currentUser.id,
        itemId: foodId,
      };

      dispatch(addWishlistItem(tempItem));

      try {
        const res = await fetch(`${API}/wishlists`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...foodItem,
            userId: currentUser.id,
            itemId: foodId,
          }),
        });
        const saved = (await res.json()) as WishlistItem;
        dispatch(replaceWishlistItem({ tempId, item: saved }));
      } catch (err) {
        console.error('Failed to add wishlist', err);
        dispatch(removeWishlistByItemId(foodId));
      }
    },
    [dispatch, isLoggedIn, userId, wishlist]
  );

  const removeFromWishlist = useCallback(
    async (itemId: number): Promise<void> => {
      const entry = wishlist.find((w) => w.itemId === itemId);
      if (!entry) return;
      dispatch(removeWishlistByItemId(itemId));

      try {
        await fetch(`${API}/wishlists/${entry.id}`, { method: 'DELETE' });
      } catch (err) {
        console.error('Failed to remove wishlist', err);
        dispatch(addWishlistItem(entry));
      }
    },
    [dispatch, wishlist]
  );

  const isInWishlist = useCallback(
    (itemId: number) => wishlist.some((w) => w.itemId === itemId),
    [wishlist]
  );

  return {
    wishlist,
    wishlistCount: wishlist.length,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  };
};

interface WishlistActionHook {
  addToWishlist: (item: FoodItem) => Promise<void>;
  removeFromWishlist: (itemId: number) => Promise<void>;
}

export const useWishlistActions = (): WishlistActionHook => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(state => state.auth.currentUser !== null);
  const userId = useAppSelector(state => state.auth.currentUser?.id);

  const addToWishlist = useCallback(
    async (item: FoodItem): Promise<void> => {
      if (!isLoggedIn || userId === undefined) return;

      const { id: foodId, ...foodItem } = item;

      try {
        const checkRes = await fetch(`${API}/wishlists?userId=${userId}&itemId=${foodId}`);
        const existing = (await checkRes.json()) as WishlistItem[];
        if (existing.length > 0) return;

        const tempItem: WishlistItem = {
          ...foodItem,
          id: Date.now(),
          userId,
          itemId: foodId,
        };

        dispatch(addWishlistItem(tempItem));

        const res = await fetch(`${API}/wishlists`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...foodItem,
            userId,
            itemId: foodId,
          }),
        });

        const saved = (await res.json()) as WishlistItem;
        dispatch(replaceWishlistItem({ tempId: tempItem.id, item: saved }));
      } catch (err) {
        console.error('Failed to add wishlist', err);
        dispatch(removeWishlistByItemId(foodId));
      }
    },
    [dispatch, isLoggedIn, userId]
  );

  const removeFromWishlist = useCallback(
    async (itemId: number): Promise<void> => {
      if (!isLoggedIn || userId === undefined) return;

      dispatch(removeWishlistByItemId(itemId));

      try {
        const checkRes = await fetch(`${API}/wishlists?userId=${userId}&itemId=${itemId}`);
        const existing = (await checkRes.json()) as WishlistItem[];
        const entry = existing[0];
        if (!entry) return;

        await fetch(`${API}/wishlists/${entry.id}`, { method: 'DELETE' });
      } catch (err) {
        console.error('Failed to remove wishlist', err);
      }
    },
    [dispatch, isLoggedIn, userId]
  );

  return {
    addToWishlist,
    removeFromWishlist,
  };
};

export const useIsInWishlist = (itemId: number): boolean =>
  useAppSelector(state => state.wishlist.wishlist.some(w => w.itemId === itemId));
