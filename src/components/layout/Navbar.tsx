  import { useState } from 'react';
  import { Link, useNavigate, useLocation } from 'react-router-dom';
  import { useCart }     from '../../hooks/useCart';
  import { useWishlist } from '../../hooks/useWishlist';
  import { useUser }     from '../../hooks/useUser';
  import { useAuth }     from '../../hooks/useAuth';
  import { ageGroups }   from '../../data/foodData';

function Navbar() {

const { cartCount } = useCart();
const { wishlistCount } = useWishlist();
const { totalPoints, levelInfo, currentStreak, selectedAge, setSelectedAge } = useUser();
const { isLoggedIn, isAdmin, currentUser, logout }  = useAuth();
const location = useLocation();
const navigate = useNavigate();
// const location = useLocation();
const [menuOpen, setMenuOpen] = useState<boolean>(false);

const isActive = (path: string) => location.pathname === path;


const navLinks = [
    { to: '/',            label: 'Home'        },
    { to: '/menu',        label: 'Menu'        },
    { to: '/dashboard',   label: 'Dashboard'   },
    { to: '/leaderboard', label: 'Leaderboard' },
    { to: '/about',       label: 'About'       },
    { to: '/contact',     label: 'Contact'     },
    ...(isAdmin ? [{ to: '/admin', label: '⚙️ Admin' }] : []),
];


  return (
    <>
    <nav className="sticky top-0 z-40 bg-glass backdrop-blur-xl border-b border-primary-100 shadow-sm">
    <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="text-3xl">🥗</span>
          <div>
            <span className="text-xl font-black text-primary-700 font-display leading-none block">HFG</span>
            <span className="text-xs text-primary-400 font-medium leading-none">Healthy Food Guide</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map(link => (
            <Link key={link.to} to={link.to}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all
                ${isActive(link.to) ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-primary-50 hover:text-primary-600'}`}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right controls */}
          <div className="flex items-center gap-2 shrink-0">

            {/* Age selector — only when logged in */}
            {isLoggedIn && (
              <select value={selectedAge} onChange={e => setSelectedAge(e.target.value)}
                className="hidden md:block text-sm border-2 border-primary-200 rounded-lg px-2 py-1.5 bg-white text-primary-700 font-semibold focus:outline-none focus:border-primary-500">
                {ageGroups.map(ag => <option key={ag} value={ag}>{ag} yrs</option>)}
              </select>
            )}

            {/* Streak */}
            {isLoggedIn && currentStreak > 0 && (
              <div className="hidden md:flex items-center gap-1 bg-orange-100 text-orange-600 px-2.5 py-1.5 rounded-lg text-sm font-bold">
                <span className="streak-glow">🔥</span><span>{currentStreak}</span>
              </div>
            )}

            {/* Points */}
            {isLoggedIn && (
              <Link to="/dashboard"
                className="hidden md:flex items-center gap-1 bg-primary-100 text-primary-700 px-2.5 py-1.5 rounded-lg text-sm font-bold hover:bg-primary-200 transition-colors">
                {levelInfo.emoji} {totalPoints}pts
              </Link>
            )}

            {/* Wishlist */}
            {isLoggedIn && (
              <button type="button" onClick={() => navigate('/wishlist')}
                className="relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-red-50 transition-colors">
                <i className="ri-heart-line text-xl text-gray-600" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">{wishlistCount}</span>
                )}
              </button>
            )}

            {/* Cart */}
            {isLoggedIn && (
              <button type="button" onClick={() => navigate('/cart')}
                className="relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-primary-50 transition-colors">
                <i className="ri-shopping-cart-line text-xl text-gray-600" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-600 text-white text-xs font-bold rounded-full flex items-center justify-center animate-bounce-in">{cartCount}</span>
                )}
              </button>
            )}

            {/* Login / Logout */}
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <span className="hidden md:block text-sm font-bold text-gray-700">
                  👤 {currentUser?.name?.split(' ')[0]}
                </span>
                <button type="button" onClick={logout}
                  className="bg-red-100 hover:bg-red-200 text-red-600 font-bold px-3 py-1.5 rounded-lg text-sm transition-colors">
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login"
                className="bg-primary-600 hover:bg-primary-700 text-white font-bold px-4 py-2 rounded-lg text-sm transition-colors">
                Login
              </Link>
            )}

            {/* Mobile toggle */}
            <button type="button" onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100">
              <i className={`text-xl text-gray-600 ${menuOpen ? 'ri-close-line' : 'ri-menu-line'}`} />
            </button>
          </div>




    </div>
    </nav>
    </>
  )
}

export default Navbar

