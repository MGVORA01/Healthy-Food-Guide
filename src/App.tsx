import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './hooks/useAuth';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Leaderboard from './pages/Leaderboard';
import AdminPanel from './pages/AdminPanel';
import Menu from './pages/Menu';
import Wishlist from './pages/Wishlist';
import Dashboard from './pages/Dashboard';
import Layout from './components/layout/Layout';
import Cart from './pages/Cart';
import AboutUs from './pages/Aboutus';
import Contactus from './pages/Contactus';

function AppRoutes() {
  const { isLoggedIn } = useAuth();

  return (
    <Layout>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" replace />} />
        <Route path="/login" element={isLoggedIn ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/register" element={isLoggedIn ? <Navigate to="/" replace /> : <Register />} />
        <Route path="/leaderboard" element={isLoggedIn ? <Leaderboard /> : <Navigate to="/login" replace />} />
        <Route path="/admin" element={isLoggedIn ? <AdminPanel /> : <Navigate to="/login" replace />} />
        <Route path="/menu" element={isLoggedIn ? <Menu /> : <Navigate to="/login" replace />} />
        <Route path="/wishlist" element={isLoggedIn ? <Wishlist /> : <Navigate to="/login" replace />} />
        <Route path="/cart" element={isLoggedIn ? <Cart /> : <Navigate to="/login" replace />} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" replace />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/contact' element={isLoggedIn ? <Contactus /> : <Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        containerStyle={{ zIndex: 99999 }}
        toastOptions={{
          duration: 2500,
          style: {
            borderRadius: '12px',
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: '600',
            fontSize: '14px',
          },
          success: { iconTheme: { primary: '#16a34a', secondary: '#fff' } },
        }}
      />
      <AppRoutes />
    </BrowserRouter>
  );
}
