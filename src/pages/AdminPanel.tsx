// ============================================================
// src/pages/AdminPanel.jsx
// Admin only page — shows all users + Product CRUD manager
// Access: /admin  (ProtectedRoute with adminOnly=true)
// ============================================================

import { type FormEvent, type ReactNode, useEffect, useMemo, useState } from 'react';
import AdminUserTable from '../components/admin/AdminUserTable';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  createAdminProduct,
  deleteAdminProduct,
  fetchAdminProducts,
  fetchAdminUsers,
  type AdminProduct,
  type ProductId,
  updateAdminProduct,
} from '../store/adminSlice';
import type { User } from '../store/authSlice';


// ── Age group options ───────────────────────────────────────
const AGE_GROUPS = ['0-5', '6-10', '11-15', '16-20', '21+'] as const;
type AgeGroup = (typeof AGE_GROUPS)[number];


// ── Food emoji options ──────────────────────────────────────
const FOOD_EMOJIS = [
  '🍕','🍔','🍟','🌮','🌯','🥙','🧆','🥚','🍳','🥞',
  '🧇','🥓','🥩','🍗','🍖','🦴','🌭','🥪','🥗','🫕',
  '🍝','🍜','🍲','🍛','🍣','🍱','🥟','🍤','🍙','🍚',
  '🍘','🍥','🥮','🍢','🧁','🎂','🍰','🍮','🍭','🍬',
  '🍫','🍿','🍩','🍪','🌰','🥜','🍯','🧃','🥤','☕',
  '🍵','🧋','🍺','🍻','🍷','🥂','🍹','🧉','🍸','🥃',
];


// ── Blank form state ────────────────────────────────────────
type Product = AdminProduct & { ageGroup: AgeGroup };

interface ProductFormState {
  name: string;
  emoji: string;
  price: string;
  category: string;
  ageGroup: AgeGroup;
  description: string;
  stock: string;
  available: boolean;
}

type ProductErrors = Partial<Record<keyof ProductFormState, string>>;

const EMPTY_FORM: ProductFormState = {
  name: '',
  emoji: '🍕',
  price: '',
  category: '',
  ageGroup: '0-5',
  description: '',
  stock: '',
  available: true,
};


// ── Age group badge colors ──────────────────────────────────
const AGE_COLORS: Record<AgeGroup, string> = {
  '0-5':   'bg-pink-50   text-pink-700   border-pink-200',
  '6-10':  'bg-purple-50 text-purple-700 border-purple-200',
  '11-15': 'bg-blue-50   text-blue-700   border-blue-200',
  '16-20': 'bg-teal-50   text-teal-700   border-teal-200',
  '21+':   'bg-green-50  text-green-700  border-green-200',
};


// ── Reusable label + input wrapper ─────────────────────────
function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
        {label}
      </label>
      {children}
    </div>
  );
}


// ============================================================
// ProductForm — add / edit a product
// ============================================================
function ProductForm({
  initial,
  onSave,
  onCancel,
}: {
  initial: Product | null;
  onSave: (payload: Omit<Product, 'id'>, isEdit: boolean, id?: ProductId) => Promise<void>;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<ProductFormState>(() => {
    if (!initial) return EMPTY_FORM;
    return {
      name: initial.name ?? '',
      emoji: initial.emoji ?? '🍕',
      price: String(initial.price ?? ''),
      category: initial.category ?? '',
      ageGroup: initial.ageGroup ?? '0-5',
      description: initial.description ?? '',
      stock: initial.stock === null || initial.stock === undefined ? '' : String(initial.stock),
      available: initial.available ?? true,
    };
  });
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [saving, setSaving]       = useState(false);
  const [errors, setErrors] = useState<ProductErrors>({});


  const set = <K extends keyof ProductFormState>(key: K, val: ProductFormState[K]) =>
    setForm(f => ({ ...f, [key]: val }));


  const validate = () => {
    const e: ProductErrors = {};
    if (!form.name.trim())     e.name     = 'Product name is required';
    if (!form.price || Number.isNaN(Number(form.price)) || +form.price < 0)
                               e.price    = 'Enter a valid price';
    if (!form.category.trim()) e.category = 'Category is required';
    if (!form.ageGroup)        e.ageGroup = 'Age group is required';
    if (form.stock !== '' && (Number.isNaN(Number(form.stock)) || +form.stock < 0))
                               e.stock    = 'Stock must be 0 or more';
    setErrors(e);
    return Object.keys(e).length === 0;
  };


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;


    setSaving(true);
    const payload: Omit<Product, 'id'> = {
      ...form,
      price: parseFloat(form.price),
      stock: form.stock !== '' ? parseInt(form.stock, 10) : null,
    };


    try {
      const isEdit = !!initial?.id;
      await onSave(payload, isEdit, initial?.id);
    } catch {
      alert('Failed to save product. Check your JSON server.');
    } finally {
      setSaving(false);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-5">


      {/* Emoji picker + Name row */}
      <div className="flex gap-4 items-start">


        {/* Emoji selector */}
        <Field label="Icon">
          <div className="relative">
            <button
              type="button"
              onClick={() => setEmojiOpen(o => !o)}
              className="w-16 h-12 text-3xl bg-orange-50 border-2 border-orange-200 rounded-xl flex items-center justify-center hover:border-orange-400 transition-colors"
            >
              {form.emoji}
            </button>


            {emojiOpen && (
              <div className="absolute z-50 top-14 left-0 bg-white border border-gray-200 rounded-2xl shadow-xl p-3 w-72">
                <p className="text-xs font-semibold text-gray-400 mb-2 px-1">Pick a food emoji</p>
                <div className="grid grid-cols-10 gap-1 max-h-48 overflow-y-auto">
                  {FOOD_EMOJIS.map(em => (
                    <button
                      key={em}
                      type="button"
                      onClick={() => { set('emoji', em); setEmojiOpen(false); }}
                      className={`text-xl p-1 rounded-lg hover:bg-orange-100 transition-colors
                        ${form.emoji === em ? 'bg-orange-200 ring-2 ring-orange-400' : ''}`}
                    >
                      {em}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Field>


        {/* Product Name */}
        <Field label="Product Name *">
          <input
            value={form.name}
            onChange={e => set('name', e.target.value)}
            placeholder="e.g. Margherita Pizza"
            className={`border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 w-72
              ${errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
          />
          {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
        </Field>
      </div>


      {/* Price · Category · Stock */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">


        <Field label="Price (₹) *">
          <input
            type="number"
            min="0"
            step="0.01"
            value={form.price}
            onChange={e => set('price', e.target.value)}
            placeholder="199"
            className={`border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400
              ${errors.price ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
          />
          {errors.price && <span className="text-red-500 text-xs">{errors.price}</span>}
        </Field>


        <Field label="Category *">
          <input
            value={form.category}
            onChange={e => set('category', e.target.value)}
            placeholder="e.g. Breakfast, Lunch"
            className={`border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400
              ${errors.category ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
          />
          {errors.category && <span className="text-red-500 text-xs">{errors.category}</span>}
        </Field>


        <Field label="Stock Quantity">
          <input
            type="number"
            min="0"
            value={form.stock}
            onChange={e => set('stock', e.target.value)}
            placeholder="50"
            className={`border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400
              ${errors.stock ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
          />
          {errors.stock && <span className="text-red-500 text-xs">{errors.stock}</span>}
        </Field>
      </div>


      {/* Age Group selector */}
      <Field label="Age Group *">
        <div className="flex flex-wrap gap-2">
          {AGE_GROUPS.map(age => (
            <button
              key={age}
              type="button"
              onClick={() => set('ageGroup', age)}
              className={`px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all
                ${form.ageGroup === age
                  ? 'bg-orange-500 text-white border-orange-500 scale-105 shadow-sm'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-orange-300'}`}
            >
              {age === '0-5'   && '👶 '}
              {age === '6-10'  && '🧒 '}
              {age === '11-15' && '👦 '}
              {age === '16-20' && '🧑 '}
              {age === '21+'   && '🧑‍💼 '}
              {age} yrs
            </button>
          ))}
        </div>
        {errors.ageGroup && <span className="text-red-500 text-xs">{errors.ageGroup}</span>}
      </Field>


      {/* Description */}
      <Field label="Description">
        <textarea
          value={form.description}
          onChange={e => set('description', e.target.value)}
          placeholder="Short product description…"
          rows={3}
          className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
        />
      </Field>


      {/* Availability toggle */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => set('available', !form.available)}
          className={`relative w-12 h-6 rounded-full transition-colors duration-200
            ${form.available ? 'bg-green-500' : 'bg-gray-300'}`}
        >
          <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-200
            ${form.available ? 'left-7' : 'left-1'}`}
          />
        </button>
        <span className="text-sm font-medium text-gray-700">
          {form.available ? '✅ Available for order' : '❌ Unavailable'}
        </span>
      </div>


      {/* Action buttons */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-colors flex items-center gap-2"
        >
          {saving ? (
            <>
              <span className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
              Saving…
            </>
          ) : (
            <>{initial?.id ? '💾 Update Product' : '➕ Add Product'}</>
          )}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}


// ============================================================
// ProductManager — list + CRUD
// ============================================================
function ProductManager({ visible }: { visible: boolean }) {   // ← receives visible prop
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.admin.products) as Product[];
  const loading = useAppSelector((state) => state.admin.loadingProducts);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<Product | null>(null);
  const [search, setSearch]     = useState('');
  const [filterAge, setFilterAge] = useState<'All' | AgeGroup>('All');
  const [deleteId, setDeleteId] = useState<ProductId | null>(null);


  useEffect(() => { void loadProducts(); }, []);


  const loadProducts = async () => {
    await dispatch(fetchAdminProducts()).unwrap();
  };


  const handleSave = async (payload: Omit<Product, 'id'>, isEdit: boolean, id?: ProductId) => {
    if (isEdit && id !== undefined) {
      await dispatch(updateAdminProduct({ id, payload })).unwrap();
    } else {
      await dispatch(createAdminProduct(payload)).unwrap();
    }
    window.dispatchEvent(new Event('hfg-products-updated'));
    setShowForm(false);
    setEditItem(null);
  };


  const handleDelete = async (id: ProductId) => {
    try {
      await dispatch(deleteAdminProduct(id)).unwrap();
      window.dispatchEvent(new Event('hfg-products-updated'));
    } catch {
      alert('Delete failed.');
    } finally {
      setDeleteId(null);
    }
  };


  const openEdit = (product: Product) => { setEditItem(product); setShowForm(true); };
  const openAdd  = ()         => { setEditItem(null);    setShowForm(true); };


  const filtered = products.filter(p => {
    const matchSearch = p.name?.toLowerCase().includes(search.toLowerCase()) ||
                        p.category?.toLowerCase().includes(search.toLowerCase());
    const matchAge    = filterAge === 'All' || p.ageGroup === filterAge;
    return matchSearch && matchAge;
  });


  // ── Hide entire section when toggled off ──────────────────
  if (!visible) return null;


  return (
    <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6 mt-8">


      {/* Section header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <h2 className="text-2xl font-black font-display text-gray-800">🍽️ Product Manager</h2>
        <div className="flex gap-2 flex-wrap">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search products…"
            className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 w-44"
          />
          <button
            onClick={openAdd}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-2 rounded-xl text-sm transition-colors whitespace-nowrap"
          >
            ➕ Add Product
          </button>
          <button
            onClick={loadProducts}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-3 py-2 rounded-xl text-sm transition-colors"
          >
            🔄
          </button>
        </div>
      </div>


      {/* Age group filter tabs */}
      <div className="flex gap-2 flex-wrap mb-6">
        {(['All', ...AGE_GROUPS] as const).map(age => (
          <button
            key={age}
            onClick={() => setFilterAge(age)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all
              ${filterAge === age
                ? 'bg-orange-500 text-white border-orange-500'
                : `bg-white border-gray-200 text-gray-500 hover:border-orange-300 ${age === 'All' ? '' : AGE_COLORS[age]}`}`}
          >
            {age === 'All'   ? '🌐 All Ages' :
             age === '0-5'   ? `👶 ${age} yrs` :
             age === '6-10'  ? `🧒 ${age} yrs` :
             age === '11-15' ? `👦 ${age} yrs` :
             age === '16-20' ? `🧑 ${age} yrs` :
                               `🧑‍💼 ${age} yrs`}
          </button>
        ))}
        <span className="ml-auto text-xs text-gray-400 self-center">
          {filtered.length} product(s)
        </span>
      </div>


      {/* Add / Edit form */}
      {showForm && (
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 mb-6">
          <h3 className="font-black text-lg text-gray-800 mb-4">
            {editItem ? `✏️ Edit: ${editItem.name}` : '➕ New Product'}
          </h3>
          <ProductForm
            initial={editItem}
            onSave={handleSave}
            onCancel={() => { setShowForm(false); setEditItem(null); }}
          />
        </div>
      )}


      {/* Product list */}
      {loading ? (
        <div className="text-center py-10">
          <div className="w-10 h-10 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-2" />
          <p className="text-gray-400">Loading products…</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p className="text-5xl mb-3">🍽️</p>
          <p className="font-semibold">
            {search || filterAge !== 'All' ? 'No products match your filters' : 'No products yet — add one!'}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide border-b border-gray-100">
                <th className="pb-3 pr-4">Product</th>
                <th className="pb-3 pr-4">Category</th>
                <th className="pb-3 pr-4">Age Group</th>
                <th className="pb-3 pr-4">Price</th>
                <th className="pb-3 pr-4">Stock</th>
                <th className="pb-3 pr-4">Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(product => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">


                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl leading-none">{product.emoji || '🍽️'}</span>
                      <div>
                        <p className="font-semibold text-gray-800">{product.name}</p>
                        {product.description && (
                          <p className="text-xs text-gray-400 truncate max-w-[160px]">{product.description}</p>
                        )}
                      </div>
                    </div>
                  </td>


                  <td className="py-3 pr-4">
                    <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-2 py-1 rounded-lg">
                      {product.category || '—'}
                    </span>
                  </td>


                  <td className="py-3 pr-4">
                    <span className={`text-xs font-bold px-2 py-1 rounded-lg border
                      ${AGE_COLORS[product.ageGroup as AgeGroup] ?? 'bg-gray-50 text-gray-500 border-gray-200'}`}>
                      {product.ageGroup ? `${product.ageGroup} yrs` : '—'}
                    </span>
                  </td>


                  <td className="py-3 pr-4 font-bold text-gray-800">
                    ₹{Number(product.price || 0).toFixed(2)}
                  </td>


                  <td className="py-3 pr-4 text-gray-600">
                    {product.stock !== null && product.stock !== undefined ? product.stock : '∞'}
                  </td>


                  <td className="py-3 pr-4">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-lg
                      ${product.available
                        ? 'bg-green-50 text-green-700'
                        : 'bg-red-50 text-red-600'}`}>
                      {product.available ? '✅ Active' : '❌ Inactive'}
                    </span>
                  </td>


                  <td className="py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEdit(product)}
                        className="bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold px-3 py-1.5 rounded-lg text-xs transition-colors"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => setDeleteId(product.id)}
                        className="bg-red-50 hover:bg-red-100 text-red-600 font-semibold px-3 py-1.5 rounded-lg text-xs transition-colors"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}


      {/* Delete confirmation modal */}
      {deleteId !== null && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-sm w-full">
            <p className="text-4xl text-center mb-3">⚠️</p>
            <h3 className="text-lg font-black text-center text-gray-800 mb-2">Delete Product?</h3>
            <p className="text-sm text-gray-500 text-center mb-6">
              This action cannot be undone. The product will be permanently removed.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2.5 rounded-xl text-sm transition-colors"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2.5 rounded-xl text-sm transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


// ============================================================
// AdminPanel — main export
// ============================================================
export default function AdminPanel() {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.admin.users);
  const loading = useAppSelector((state) => state.admin.loadingUsers);
  const sortedUsers = useMemo(
    () => [...users].sort((a, b) => (b.totalPoints || 0) - (a.totalPoints || 0)),
    [users]
  );

  // ── NEW: toggle states ────────────────────────────────────
  const [showUsers, setShowUsers]       = useState(true);
  const [showProducts, setShowProducts] = useState(true);


  useEffect(() => { void loadUsers(); }, []);


  const loadUsers = async () => {
    await dispatch(fetchAdminUsers()).unwrap();
  };


  const totalPoints = sortedUsers.reduce((s, u) => s + (u.totalPoints || 0), 0);
  const totalOrders = sortedUsers.reduce((s, u) => s + (u.totalOrders || 0), 0);
  const totalBadges = sortedUsers.reduce((s, u) => s + (u.earnedBadges?.length || 0), 0);


  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">


        {/* Header */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-3xl p-8 mb-8">
          <h1 className="text-4xl font-black font-display mb-1"> Admin Panel</h1>
          <p className="text-gray-300">Manage users, products, and platform stats</p>
        </div>


        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            ['👥', 'Total Users',   sortedUsers.length, 'bg-blue-50   text-blue-700'  ],
            ['🏆', 'Total Points',  totalPoints,  'bg-green-50  text-green-700' ],
            ['🛒', 'Total Orders',  totalOrders,  'bg-orange-50 text-orange-700'],
            ['🏅', 'Badges Earned', totalBadges,  'bg-yellow-50 text-yellow-700'],
          ].map(([emoji, label, value, style]) => (
            <div key={label} className={`${style} rounded-2xl p-5 text-center`}>
              <div className="text-3xl mb-1">{emoji}</div>
              <div className="text-3xl font-black">{value}</div>
              <div className="text-sm font-semibold mt-1 opacity-70">{label}</div>
            </div>
          ))}
        </div>


        {/* ── NEW: Section Toggle Buttons ────────────────────── */}
        <div className="flex gap-3 flex-wrap mb-6">
          <button
            onClick={() => setShowUsers(prev => !prev)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm border-2 transition-all
              ${showUsers
                ? 'bg-blue-500 text-white border-blue-500 shadow-md'
                : 'bg-white text-blue-600 border-blue-300 hover:border-blue-500'}`}
          >
            {/* <span>{showUsers ? '🙈' : '👁️'}</span> */}
            {showUsers ? 'Hide Users' : 'Show Users'}
          </button>

          <button
            onClick={() => setShowProducts(prev => !prev)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm border-2 transition-all
              ${showProducts
                ? 'bg-orange-500 text-white border-orange-500 shadow-md'
                : 'bg-white text-orange-600 border-orange-300 hover:border-orange-500'}`}
          >
            {/* <span>{showProducts ? '🙈' : '👁️'}</span> */}
            {showProducts ? 'Hide Products' : 'Show Products'}
          </button>
        </div>


        {/* Users table */}
        {showUsers && (
          <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black font-display text-gray-800">All Registered Users</h2>
              <button
                onClick={loadUsers}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-xl text-sm transition-colors"
              >
                🔄 Refresh
              </button>
            </div>
            {loading ? (
              <div className="text-center py-10">
                <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-2" />
                <p className="text-gray-400">Loading users…</p>
              </div>
            ) : (
              <AdminUserTable users={sortedUsers as User[]} />
            )}
          </div>
        )}


        {/* Product CRUD Manager */}
        <ProductManager visible={showProducts} />


      </div>
    </div>
  );
}
