import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API } from '../api/api';
import type { User } from './authSlice';

export type ProductId = string | number;

export interface AdminProduct {
  id: ProductId;
  name: string;
  emoji: string;
  price: number;
  category: string;
  ageGroup: string;
  description: string;
  stock: number | null;
  available: boolean;
}

interface AdminState {
  users: User[];
  products: AdminProduct[];
  loadingUsers: boolean;
  loadingProducts: boolean;
  error: string | null;
}

const initialState: AdminState = {
  users: [],
  products: [],
  loadingUsers: false,
  loadingProducts: false,
  error: null,
};

export const fetchAdminUsers = createAsyncThunk<User[]>(
  'admin/fetchUsers',
  async () => {
    const res = await fetch(`${API}/users`);
    if (!res.ok) throw new Error('Failed to fetch users');
    return (await res.json()) as User[];
  }
);

export const fetchAdminProducts = createAsyncThunk<AdminProduct[]>(
  'admin/fetchProducts',
  async () => {
    const res = await fetch(`${API}/products`);
    if (!res.ok) throw new Error('Failed to fetch products');
    return (await res.json()) as AdminProduct[];
  }
);

export const createAdminProduct = createAsyncThunk<AdminProduct, Omit<AdminProduct, 'id'>>(
  'admin/createProduct',
  async (payload) => {
    const res = await fetch(`${API}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to create product');
    return (await res.json()) as AdminProduct;
  }
);

export const updateAdminProduct = createAsyncThunk<
  AdminProduct,
  { id: ProductId; payload: Omit<AdminProduct, 'id'> }
>('admin/updateProduct', async ({ id, payload }) => {
  const res = await fetch(`${API}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to update product');
  return (await res.json()) as AdminProduct;
});

export const deleteAdminProduct = createAsyncThunk<ProductId, ProductId>(
  'admin/deleteProduct',
  async (id) => {
    const res = await fetch(`${API}/products/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete product');
    return id;
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminUsers.pending, (state) => {
        state.loadingUsers = true;
        state.error = null;
      })
      .addCase(fetchAdminUsers.fulfilled, (state, action) => {
        state.loadingUsers = false;
        state.users = action.payload;
      })
      .addCase(fetchAdminUsers.rejected, (state, action) => {
        state.loadingUsers = false;
        state.error = action.error.message || 'Failed to fetch users';
      })
      .addCase(fetchAdminProducts.pending, (state) => {
        state.loadingProducts = true;
        state.error = null;
      })
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.loadingProducts = false;
        state.products = action.payload;
      })
      .addCase(fetchAdminProducts.rejected, (state, action) => {
        state.loadingProducts = false;
        state.error = action.error.message || 'Failed to fetch products';
      })
      .addCase(createAdminProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(updateAdminProduct.fulfilled, (state, action) => {
        state.products = state.products.map((p) => (p.id === action.payload.id ? action.payload : p));
      })
      .addCase(deleteAdminProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p.id !== action.payload);
      });
  },
});

export default adminSlice.reducer;
