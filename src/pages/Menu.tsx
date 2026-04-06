// src/pages/Menu.jsx
import { useState, useMemo, useEffect, useCallback } from 'react';
import { useUser, useUserAge } from '../hooks/useUser';
import { foodData, ageInfo, type FoodItem } from '../data/foodData';
import FoodCard from '../components/menu/FoodCard';
import AgeFilter from '../components/menu/AgeFilter';
import SearchBar from '../components/menu/SearchBar';
import { API } from '../api/api';

type ApiProduct = Partial<FoodItem> & {
  id?: string | number;
  available?: boolean;
};

const ADMIN_ID_OFFSET = 1_000_000;

const toNumericId = (id: string | number | undefined, fallback: number): number => {
  if (typeof id === 'number') return id + ADMIN_ID_OFFSET;
  if (typeof id === 'string') {
    const asNumber = Number(id);
    if (!Number.isNaN(asNumber)) return asNumber + ADMIN_ID_OFFSET;
    let hash = 0;
    for (let i = 0; i < id.length; i += 1) hash = ((hash << 5) - hash + id.charCodeAt(i)) | 0;
    return Math.abs(hash) + ADMIN_ID_OFFSET;
  }
  return fallback + ADMIN_ID_OFFSET;
};

const normalizeAgeGroup = (ageGroup: string | undefined): string => {
  const cleaned = (ageGroup || '21+').trim().replace(/\s*(yrs?|years?)\.?$/i, '');
  return cleaned in ageInfo ? cleaned : '21+';
};

const normalizeProduct = (p: ApiProduct, idx: number): FoodItem => ({
  id: toNumericId(p.id, idx),
  name: p.name || `Product ${idx + 1}`,
  ageGroup: normalizeAgeGroup(p.ageGroup),
  category: p.category || 'Snacks',
  price: typeof p.price === 'number' ? p.price : Number(p.price) || 0,
  calories: typeof p.calories === 'number' ? p.calories : Number(p.calories) || 0,
  protein: p.protein || '0g',
  carbs: p.carbs || '0g',
  fat: p.fat || '0g',
  rating: typeof p.rating === 'number' ? p.rating : Number(p.rating) || 4.5,
  isHealthy: p.isHealthy ?? true,
  emoji: p.emoji || '🥗',
  color: p.color || '#E8F5E9',
  description: p.description || 'Added from admin panel.',
  tags: p.tags?.length ? p.tags : [String(p.category || 'snack').toLowerCase()],
});

export default function Menu() {
  const { selectedAge, setSelectedAge } = useUserAge();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [adminProducts, setAdminProducts] = useState<FoodItem[]>([]);

  const loadProducts = useCallback(async () => {
    try {
      const res = await fetch(`${API}/products`);
      if (!res.ok) return;
      const data = (await res.json()) as ApiProduct[];
      const normalized = (Array.isArray(data) ? data : [])
        .filter((p) => p.available !== false)
        .map((p, idx) => normalizeProduct(p, idx));
      setAdminProducts(normalized);
    } catch {
      setAdminProducts([]);
    }
  }, []);

  useEffect(() => {
    void loadProducts();

    const onProductsUpdated = () => {
      void loadProducts();
    };

    window.addEventListener('hfg-products-updated', onProductsUpdated);
    window.addEventListener('focus', onProductsUpdated);

    return () => {
      window.removeEventListener('hfg-products-updated', onProductsUpdated);
      window.removeEventListener('focus', onProductsUpdated);
    };
  }, [loadProducts]);

  const allFoods = useMemo(() => [...foodData, ...adminProducts], [adminProducts]);
  const categories = useMemo(
    () => ['All', ...Array.from(new Set(allFoods.map((item) => item.category)))],
    [allFoods]
  );

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return allFoods.filter(item => {
      const matchAge = item.ageGroup === selectedAge;
      const matchCat = category === 'All' || item.category === category;
      const matchSearch =
        query === '' ||
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.tags?.some(t => t.toLowerCase().includes(query));
      return matchAge && matchCat && matchSearch;
    });
  }, [allFoods, selectedAge, category, search]);

  const info = ageInfo[selectedAge];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-700 to-primary-600 text-white py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-black font-display mb-1">Our Menu 🍽️</h1>
          <p className="text-primary-100">Healthy food matched to your age group</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        {/* Age Filter */}
        <AgeFilter selected={selectedAge} onChange={setSelectedAge} />

        {/* Age tip */}
        <div className="bg-primary-50 border border-primary-200 rounded-2xl p-4 flex gap-3 items-start">
          <span className="text-xl">{info.icon}</span>
          <div>
            <p className="font-bold text-primary-700">{info.label}</p>
            <p className="text-primary-600 text-sm">{info.tip}</p>
          </div>
        </div>

        {/* Search + Category */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <SearchBar value={search} onChange={setSearch} />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <button type="button" key={cat} onClick={() => setCategory(cat)}
                className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-all border-2
                  ${category === cat ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-gray-600 border-gray-200 hover:border-primary-400'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between">
          <p className="text-gray-500 text-sm font-medium">
            Showing <span className="text-primary-600 font-bold">{filtered.length}</span> items for {info.icon} {selectedAge} years
          </p>
          {search && <button type="button" onClick={() => setSearch('')} className="text-sm text-red-400 hover:text-red-600">Clear search ×</button>}
        </div>

        {/* Food grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {filtered.map(item => <FoodCard key={item.id} item={item} />)}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-600 font-display">No foods found</h3>
            <p className="text-gray-400 mt-2">Try a different search or age group</p>
            <button type="button" onClick={() => { setSearch(''); setCategory('All'); }} className="mt-4 text-primary-600 font-semibold hover:underline">
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
