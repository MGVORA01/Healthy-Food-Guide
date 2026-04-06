// src/pages/Cart.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useUser } from '../hooks/useUser';
import CartItem from '../components/cart/CartItem';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';

export default function Cart() {
  const { cartItems, clearCart, cartTotal } = useCart();
  const { selectedAge, placeOrder } = useUser();
  const navigate = useNavigate();
  const [ordered, setOrdered] = useState(false);

  // Calculate points preview
  let pointsPreview = 10;
  const ageMatches = cartItems.filter(i => i.ageGroup === selectedAge).length;
  if (ageMatches > 0) pointsPreview += 15;
  const cats = new Set(cartItems.map(i => i.category));
  if (cats.size >= 3) pointsPreview += 20;

  const handleOrder = () => {
    if (cartItems.length === 0) return;
    const earnedPts = placeOrder(cartItems, selectedAge);
    clearCart();
    setOrdered(true);
    toast.success(`Order placed! You earned ${earnedPts} points 🎉`, { duration: 4000 });
  };

  if (ordered) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="text-8xl mb-6 animate-bounce">🎉</div>
          <h2 className="text-4xl font-black font-display text-primary-700 mb-2">Order Placed!</h2>
          <p className="text-gray-500 mb-2">You earned <span className="text-primary-600 font-bold">{pointsPreview} points</span> for this healthy order!</p>
          <p className="text-gray-400 text-sm mb-8">Keep ordering healthy food to grow your streak and unlock badges.</p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => navigate('/menu')} variant="primary" size="lg"> Order More</Button>
            <Button onClick={() => navigate('/dashboard')} variant="secondary" size="lg"> My Dashboard</Button>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-8xl mb-6">🛒</div>
          <h2 className="text-3xl font-black font-display text-gray-700 mb-2">Your cart is empty</h2>
          <p className="text-gray-400 mb-6">Add some healthy foods to get started!</p>
          <Button onClick={() => navigate('/menu')} variant="primary" size="lg">Browse Menu</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-black font-display text-gray-800 mb-8">Your Cart 🛒</h1>

        {/* Points preview banner */}
        <div className="bg-gradient-to-r from-primary-600 to-green-500 text-white rounded-2xl p-4 mb-6 flex items-center gap-3">
          <span className="text-3xl">🎯</span>
          <div>
            <p className="font-bold">You'll earn <span className="text-yellow-200 text-xl">{pointsPreview} points</span> for this order!</p>
            <div className="text-primary-100 text-xs mt-0.5 flex flex-wrap gap-2">
              <span>+10 base</span>
              {ageMatches > 0 && <span>+15 age match bonus</span>}
              {cats.size >= 3 && <span>+20 balanced meal bonus</span>}
            </div>
          </div>
        </div>

        {/* Cart items */}
        <div className="space-y-3 mb-6">
          {cartItems.map(item => <CartItem key={item.id} item={item} />)}
        </div>

        {/* Order summary */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6">
          <h3 className="font-bold text-lg text-gray-800 font-display mb-4">Order Summary</h3>
          <div className="space-y-2 text-sm mb-4">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal ({cartItems.reduce((s, i) => s + i.quantity, 0)} items)</span>
              <span>₹{cartTotal}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery Fee</span>
              <span className="text-primary-600 font-semibold">{cartTotal >= 200 ? 'FREE 🎉' : '₹40'}</span>
            </div>
            {cartTotal < 200 && (
              <p className="text-xs text-orange-500">Add ₹{200 - cartTotal} more for free delivery!</p>
            )}
          </div>
          <div className="border-t border-gray-100 pt-3 flex justify-between font-black text-lg mb-5">
            <span>Total</span>
            <span className="text-primary-600">₹{cartTotal >= 200 ? cartTotal : cartTotal + 40}</span>
          </div>
          <Button onClick={handleOrder} variant="primary" size="lg" className="w-full">
            Place Order & Earn {pointsPreview}pts
          </Button>
        </div>
      </div>
    </div>
  );
}
