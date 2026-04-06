import { useCallback, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import type { FoodItem } from '../data/foodData';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  addCartItem,
  clearCartItems,
  removeCartItem,
  setCartItems,
  setCartItemQuantity,
  type CartItem,
} from '../store/cartSlice';
import { API } from '../api/api';

export type { CartItem };

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: FoodItem) => Promise<void>;
  removeFromCart: (id: number) => Promise<void>;
  updateQuantity: (id: number, qty: number) => Promise<void>;
  clearCart: () => Promise<void>;
  cartCount: number;
  cartTotal: number;
}


export const useCart = (): CartContextType => {
  const dispatch = useAppDispatch();
  const { currentUser, isLoggedIn } = useAuth();
  const userId = currentUser?.id;
  const cartItems = useAppSelector(state => state.cart.cartItems);

  const loadCart = useCallback(async () => {
    if (userId === undefined) return;
    try {
      const res = await fetch(`${API}/carts?userId=${userId}`);
      const data = (await res.json()) as CartItem[];
      dispatch(setCartItems(data));
    } catch {
      console.error('Could not load cart');
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (isLoggedIn && userId !== undefined) {
      void loadCart();
    } else {
      dispatch(clearCartItems());
    }
  }, [dispatch, isLoggedIn, loadCart, userId]);

  const addToCart = useCallback(
    async (item: FoodItem): Promise<void> => {
      if (!isLoggedIn || userId === undefined) return;

      const existing = cartItems.find(c => c.itemId === item.id);
      if (existing) {
        await (async () => {
          const nextQty = existing.quantity + 1;
          await fetch(`${API}/carts/${existing.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quantity: nextQty }),
          });
          dispatch(setCartItemQuantity({ id: existing.id, quantity: nextQty }));
        })();
        return;
      }

      const newItem = {
        userId,
        itemId: item.id,
        name: item.name,
        emoji: item.emoji,
        color: item.color,
        price: item.price,
        calories: item.calories,
        ageGroup: item.ageGroup,
        category: item.category,
        quantity: 1,
      };

      try {
        const res = await fetch(`${API}/carts`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newItem),
        });
        const saved = (await res.json()) as CartItem;
        dispatch(addCartItem(saved));
      } catch {
        console.error('Could not add to cart');
      }
    },
    [cartItems, dispatch, isLoggedIn, userId]
  );

  const removeFromCart = useCallback(
    async (id: number): Promise<void> => {
      try {
        await fetch(`${API}/carts/${id}`, { method: 'DELETE' });
        dispatch(removeCartItem(id));
      } catch {
        console.error('Could not remove from cart');
      }
    },
    [dispatch]
  );

  const updateQuantity = useCallback(
    async (id: number, qty: number): Promise<void> => {
      if (qty < 1) {
        await removeFromCart(id);
        return;
      }

      try {
        await fetch(`${API}/carts/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ quantity: qty }),
        });
        dispatch(setCartItemQuantity({ id, quantity: qty }));
      } catch {
        console.error('Could not update quantity');
      }
    },
    [dispatch, removeFromCart]
  );

  const clearCart = useCallback(async (): Promise<void> => {
    try {
      await Promise.all(cartItems.map(item => fetch(`${API}/carts/${item.id}`, { method: 'DELETE' })));
      dispatch(clearCartItems());
    } catch {
      console.error('Could not clear cart');
    }
  }, [cartItems, dispatch]);

  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartTotal,
  };
};

interface CartActionHook {
  addToCart: (item: FoodItem) => Promise<void>;
}

export const useCartActions = (): CartActionHook => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(state => state.auth.currentUser !== null);
  const userId = useAppSelector(state => state.auth.currentUser?.id);

  const addToCart = useCallback(
    async (item: FoodItem): Promise<void> => {
      if (!isLoggedIn || userId === undefined) return;

      try {
        const existingRes = await fetch(`${API}/carts?userId=${userId}&itemId=${item.id}`);
        const existingData = (await existingRes.json()) as CartItem[];
        const existing = existingData[0];

        if (existing) {
          const nextQty = existing.quantity + 1;
          await fetch(`${API}/carts/${existing.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quantity: nextQty }),
          });
          dispatch(setCartItemQuantity({ id: existing.id, quantity: nextQty }));
          return;
        }

        const newItem = {
          userId,
          itemId: item.id,
          name: item.name,
          emoji: item.emoji,
          color: item.color,
          price: item.price,
          calories: item.calories,
          ageGroup: item.ageGroup,
          category: item.category,
          quantity: 1,
        };

        const res = await fetch(`${API}/carts`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newItem),
        });
        const saved = (await res.json()) as CartItem;
        dispatch(addCartItem(saved));
      } catch {
        console.error('Could not add to cart');
      }
    },
    [dispatch, isLoggedIn, userId]
  );

  return { addToCart };
};
