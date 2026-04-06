import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  clearCurrentUser,
  mergeCurrentUser,
  setCurrentUser,
  type User,
} from '../store/authSlice';
import { API } from '../api/api';

export type { User };

interface AuthContextType {
  currentUser: User | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string, selectedAge: string) => Promise<boolean>;
  updateUser: (updatedFields: Partial<User>) => Promise<void>;
}


export const useAuth = (): AuthContextType => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(state => state.auth.currentUser);

  const isLoggedIn = currentUser !== null;
  const isAdmin = currentUser?.role === 'admin';

  const register = async (
    name: string,
    email: string,
    password: string,
    selectedAge: string
  ): Promise<boolean> => {
    try {
      const checkRes = await fetch(`${API}/users?email=${email}`);
      const existing: User[] = await checkRes.json();

      if (existing.length > 0) {
        toast.error('This email is already registered!');
        return false;
      }

      const newUser: Omit<User, 'id'> = {
        name,
        email,
        password,
        role: 'user',
        selectedAge,
        totalPoints: 0,
        currentStreak: 0,
        longestStreak: 0,
        lastOrderDate: null,
        earnedBadges: [],
        totalOrders: 0,
        weeklyOrders: [0, 0, 0, 0, 0, 0, 0],
        createdAt: new Date().toLocaleDateString(),
      };

      const res = await fetch(`${API}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });

      if (!res.ok) {
        throw new Error('Failed to create account');
      }

      await res.json();
      toast.success('Account created successfully. Please login.');
      return true;
    } catch {
      toast.error('Server error. Is JSON server running on port 3001?');
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API}/users?email=${email}`);
      const users: User[] = await res.json();

      if (users.length === 0) {
        toast.error('Email not found!');
        return false;
      }

      const user = users[0];
      if (user.password !== password) {
        toast.error('Wrong password!');
        return false;
      }

      dispatch(setCurrentUser(user));
      localStorage.setItem('hfg_current_user', JSON.stringify(user));
      toast.success(`Welcome back ${user.name}!`);
      return true;
    } catch {
      toast.error('Server error. Is JSON server running on port 3001?');
      return false;
    }
  };

  const logout = () => {
    dispatch(clearCurrentUser());
    localStorage.removeItem('hfg_current_user');
    toast.success('Logged out successfully!');
  };

  const updateUser = async (updatedFields: Partial<User>): Promise<void> => {
    if (!currentUser?.id) return;

    try {
      const res = await fetch(`${API}/users/${currentUser.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFields),
      });

      if (!res.ok) {
        throw new Error('Failed to update user');
      }

      const updated = (await res.json()) as Partial<User>;
      const mergedUser: User = { ...currentUser, ...updated };
      dispatch(mergeCurrentUser(updated));
      localStorage.setItem('hfg_current_user', JSON.stringify(mergedUser));
    } catch {
      console.error('Failed to update user in db.json');
    }
  };

  return {
    currentUser,
    isLoggedIn,
    isAdmin,
    login,
    logout,
    register,
    updateUser,
  };
};
