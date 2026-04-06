import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FoodItem } from '../data/foodData';

export interface WishlistItem extends Omit<FoodItem, 'id'> {
  id: string | number;
  userId: string | number;
  itemId: number;
}

interface WishlistState {
  wishlist: WishlistItem[];
}

const initialState: WishlistState = {
  wishlist: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    setWishlistItems: (state, action: PayloadAction<WishlistItem[]>) => {
      state.wishlist = action.payload;
    },
    addWishlistItem: (state, action: PayloadAction<WishlistItem>) => {
      state.wishlist.push(action.payload);
    },
    replaceWishlistItem: (
      state,
      action: PayloadAction<{ tempId: string | number; item: WishlistItem }>
    ) => {
      state.wishlist = state.wishlist.map(w => (w.id === action.payload.tempId ? action.payload.item : w));
    },
    removeWishlistByItemId: (state, action: PayloadAction<number>) => {
      state.wishlist = state.wishlist.filter(w => w.itemId !== action.payload);
    },
    clearWishlistItems: state => {
      state.wishlist = [];
    },
  },
});

export const {
  setWishlistItems,
  addWishlistItem,
  replaceWishlistItem,
  removeWishlistByItemId,
  clearWishlistItems,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
