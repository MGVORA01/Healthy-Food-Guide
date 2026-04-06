import { useNavigate } from 'react-router-dom';
import { useWishlist, type WishlistItem } from '../hooks/useWishlist';
import { useCart } from '../hooks/useCart';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleMoveToCart = (item: WishlistItem) => {
    const { id: _wishlistId, itemId, userId: _userId, ...foodSnapshot } = item;
    toast.promise(
      (async () => {
        await addToCart({ ...foodSnapshot, id: itemId });
        await removeFromWishlist(item.itemId);
      })(),
      {
        loading: `Moving ${item.name}...`,
        success: `${item.emoji} Moved to cart!`,
        error: 'Could not move item',
      },
      { icon: '🛒' }
    );
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-4xl mb-3">❤️</div>
          <h2 className="text-3xl font-black font-display text-gray-700 mb-2">
            No saved items yet
          </h2>
          <p className="text-gray-400 mb-6">
            Tap the ❤️ on any food card to save it here!
          </p>
          <Button
            onClick={() => navigate('/menu')}
            variant="primary"
            size="lg"
          >
            🍽️ Browse Menu
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-black font-display text-gray-800">
            My Wishlist ❤️
          </h1>
          <span className="bg-red-100 text-red-600 font-bold px-3 py-1 rounded-full text-sm">
            {wishlist.length} items
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden hover:shadow-card-hover transition-all"
            >
              <div
                className="h-36 flex items-center justify-center text-6xl"
                style={{ backgroundColor: item.color }}
              >
                {item.emoji}
              </div>

              <div className="p-4">
                <h3 className="font-bold text-gray-800 font-display">
                  {item.name}
                </h3>

                <p className="text-xs text-gray-400 mt-0.5">
                  {item.ageGroup} yrs • {item.calories} kcal • ₹{item.price}
                </p>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleMoveToCart(item)}
                    className="flex-1 bg-primary-100 hover:bg-primary-200 text-primary-700 font-semibold text-sm py-2 rounded-xl transition-colors"
                  >
                    🛒 To Cart
                  </button>

                  <button
                    onClick={() => {
                      toast.promise(
                        removeFromWishlist(item.itemId),
                        {
                          loading: `Removing ${item.name}...`,
                          success: `${item.emoji} Removed`,
                          error: 'Could not remove item',
                        },
                        { icon: '💔' }
                      );
                    }}
                    className="w-10 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl transition-colors flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
