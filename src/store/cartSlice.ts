import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: number;
  userId: string | number;
  itemId: number;
  name: string;
  emoji: string;
  color: string;
  price: number;
  calories: number;
  ageGroup: string;
  category: string;
  quantity: number;
}

interface CartState {
  cartItems: CartItem[];
}

const initialState: CartState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.cartItems = action.payload;
    },
    addCartItem: (state, action: PayloadAction<CartItem>) => {
      state.cartItems.push(action.payload);
    },
    removeCartItem: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter(i => i.id !== action.payload);
    },
    setCartItemQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.cartItems.find(i => i.id === action.payload.id);
      if (!item) return;
      item.quantity = action.payload.quantity;
    },
    clearCartItems: state => {
      state.cartItems = [];
    },
  },
});

export const { setCartItems, addCartItem, removeCartItem, setCartItemQuantity, clearCartItems } = cartSlice.actions;
export default cartSlice.reducer;
