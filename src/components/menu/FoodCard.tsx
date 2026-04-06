import { useState, useCallback, MouseEvent, memo } from 'react';
import toast from 'react-hot-toast';
import { useCartActions } from '../../hooks/useCart';
import { useIsInWishlist, useWishlistActions } from '../../hooks/useWishlist';
import { useUserRewardActions } from '../../hooks/useUser';
import { useAppSelector } from '../../store/hooks';
import Button from '../ui/Button';
import { FoodItem } from '../../data/foodData';

interface FoodCardProps {
  item: FoodItem;
}

function FoodCard({ item }: FoodCardProps) {
  const { addToCart } = useCartActions();
  const { addToWishlist, removeFromWishlist } = useWishlistActions();
  const { incrementCartAdds, addToWishlistPoints } = useUserRewardActions();
  const selectedAge = useAppSelector(state => state.user.selectedAge);
  const [madeCount, setMadeCount] = useState<number>(() => {
    return parseInt(localStorage.getItem(`hfg_made_${item.id}`) || String(Math.floor(Math.random() * 500 + 50)));
  });
  const [isMade, setIsMade] = useState<boolean>(() => !!localStorage.getItem(`hfg_imade_${item.id}`));

  const inWishlist = useIsInWishlist(item.id);
  const isAgeMatch = item.ageGroup === selectedAge;

  const handleAddToCart = useCallback((e: MouseEvent) => {
      e.stopPropagation();
      toast.promise(
        (async () => {
          await addToCart(item);
          incrementCartAdds();
        })(),
        {
          loading: `Adding ${item.name}...`,
          success: `${item.emoji} ${item.name} added to cart! +2pts`,
          error: 'Could not add to cart',
        },
        { icon: '🛒' }
      );
    }, [addToCart, incrementCartAdds, item]);

  const handleWishlist = useCallback((e: MouseEvent) => {
      e.stopPropagation();
      if (inWishlist) {
        toast.promise(
          removeFromWishlist(item.id),
          {
            loading: `Removing ${item.name}...`,
            success: `${item.emoji} ${item.name} removed from wishlist`,
            error: 'Could not update wishlist',
          },
          { icon: '💔' }
        );
      } else {
        toast.promise(
          (async () => {
            await addToWishlist(item);
            addToWishlistPoints();
          })(),
          {
            loading: `Saving ${item.name}...`,
            success: `${item.emoji} ${item.name} saved to wishlist! +2pts`,
            error: 'Could not update wishlist',
          },
          { icon: '❤️' }
        );
      }
    }, [inWishlist, removeFromWishlist, addToWishlist, addToWishlistPoints, item]);

  const handleIMadeThis = useCallback((e: MouseEvent) => {
      e.stopPropagation();
      if (isMade) return;
      const newCount = madeCount + 1;
      setMadeCount(newCount);
      setIsMade(true);
      localStorage.setItem(`hfg_made_${item.id}`, String(newCount));
      localStorage.setItem(`hfg_imade_${item.id}`, '1');
      toast.success('Awesome! +5pts 🍳', { icon: '👨‍🍳' });
    }, [isMade, madeCount, item.id])

  return (
    <div className="flip-card h-80 w-full cursor-pointer group">
      <div className="flip-card-inner h-full w-full">
        {/* FRONT */}
        <div className="flip-card-front bg-white shadow-card hover:shadow-card-hover border border-gray-100 overflow-hidden flex flex-col">
          <div className="relative h-44 flex items-center justify-center text-7xl overflow-hidden" style={{ backgroundColor: item.color }}>
            <span className="animate-float">{item.emoji}</span>
            {isAgeMatch && (
              <span className="absolute top-2 left-2 bg-primary-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">✓ Your Age</span>
            )}
          <button type="button"
  onClick={handleWishlist}
  className="absolute top-2 right-2 w-7 h-7 bg-white/80 rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
>
  <i
    className={`text-sm ${
      inWishlist ? 'ri-heart-fill text-red-500' : 'ri-heart-line text-gray-500'
    }`}
  />
</button>
          </div>

          <div className="p-3 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-1">
                <h3 className="font-bold text-gray-800 text-sm leading-tight font-display">{item.name}</h3>
                <span className="text-xs bg-primary-50 text-primary-600 font-semibold px-1.5 py-0.5 rounded-md shrink-0">{item.ageGroup}yr</span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-yellow-400 text-xs">{'⭐'.repeat(Math.round(item.rating))}</span>
                <span className="text-xs text-gray-400">{item.rating}</span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-primary-700 font-black text-base">₹{item.price}</span>
              <span className="text-xs text-gray-400">{item.calories} kcal</span>
            </div>
          </div>
        </div>

        {/* BACK */}
        <div className="flip-card-back bg-primary-800 text-white p-4 flex flex-col justify-between overflow-hidden">
          <div>
            <h3 className="font-bold text-lg font-display mb-1">{item.name}</h3>
            <p className="text-primary-100 text-xs leading-relaxed mb-3">{item.description}</p>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {[['Protein', item.protein], ['Carbs', item.carbs], ['Fat', item.fat]].map(([label, val]) => (
                <div key={label} className="bg-primary-700 rounded-lg p-2 text-center">
                  <div className="text-xs text-primary-300">{label}</div>
                  <div className="font-bold text-sm">{val}</div>
                </div>
              ))}
            </div>
            <button type="button" onClick={handleIMadeThis}
              className={`w-full text-xs font-semibold py-1.5 rounded-lg transition-all ${isMade ? 'bg-green-600 cursor-default' : 'bg-primary-600 hover:bg-primary-500'}`}>
              {isMade ? '✓ You Made This!' : `🍳 I Made This! (${madeCount})`}
            </button>
          </div>
          <div className="flex gap-2 mt-2">
            <Button onClick={handleWishlist} variant={inWishlist ? 'danger' : 'secondary'} size="sm" className="flex-1 text-xs !py-2">
              {inWishlist ? '💔 Remove' : '❤️ Save'}
            </Button>
            <Button onClick={handleAddToCart} variant="orange" size="sm" className="flex-1 text-xs !py-2">
              🛒 Add
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(FoodCard);
