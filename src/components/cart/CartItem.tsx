// src/components/cart/CartItem.tsx
import { useCart, type CartItem as CartItemType } from '../../hooks/useCart';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-card transition-shadow">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-4xl shrink-0" style={{ backgroundColor: item.color }}>
        {item.emoji}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-gray-800 truncate font-display">{item.name}</h4>
        <p className="text-xs text-gray-400">{item.ageGroup} yrs • {item.calories} kcal</p>
        <p className="text-primary-600 font-bold mt-0.5">₹{item.price} each</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-primary-100 text-gray-600 font-bold flex items-center justify-center transition-colors">
          −
        </button>
        <span className="w-8 text-center font-bold text-gray-700">{item.quantity}</span>
        <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="w-8 h-8 rounded-lg bg-primary-100 hover:bg-primary-200 text-primary-700 font-bold flex items-center justify-center transition-colors">
          +
        </button>
      </div>
      <div className="text-right shrink-0">
        <p className="font-black text-gray-800">₹{item.price * item.quantity}</p>
        <button type="button" onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 text-xs mt-1 transition-colors">Remove</button>
      </div>
    </div>
  );
}
