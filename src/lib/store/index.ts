import { create } from 'zustand';
import { I_UserSchema } from '../types';
import { authenticateUser } from '@/lib/queries/user';
import Cookie from 'js-cookie';
import { JWT } from '@/lib/variables';
import { extractAuthToken } from '@/lib';

interface IUserStore {
  user: I_UserSchema;
  getUser: () => Promise<I_UserSchema | null>;
  logout: () => void;
  setUser: (newUser: I_UserSchema) => void;
  isAuthenticated: () => boolean;
}

export const emptyUser: I_UserSchema = {
  id: '',
  username: '',
  email: '',
  password: '',
  first_name: '',
  last_name: '',
  bio: '',
  picture: '',
  created_at: '',
  updated_at: '',
  last_active_at: '',
};

const useUser = create<IUserStore>((set, get) => ({
  user: emptyUser,

  logout: () => {
    set({ user: { ...emptyUser } });
    localStorage.removeItem('user');
  },

  setUser: (newUser: I_UserSchema) => {
    set({ user: { ...newUser } });
    localStorage.setItem('user', JSON.stringify(newUser));
  },

  isAuthenticated: () => get().user.id !== '',

  getUser: async () => {
    if (typeof window === 'undefined') {
      console.log('NO WINDOW');
      return null;
    }
    const isAuth = extractAuthToken();
    if (!isAuth) {
      set({ user: { ...emptyUser } });
      localStorage.removeItem('user');
      return null;
    }
    let user = get().user;
    if (user.id !== '') {
      set({ user });
      return user;
    }
    user = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')!)
      : emptyUser;
    if (user.id !== '') {
      set({ user });
      return user;
    }

    const cookie = Cookie.get(JWT.token_name);
    if (!cookie) {
      console.log('No cookie');
      return null;
    }
    user = (await authenticateUser()) ?? emptyUser;
    if (!user?.id) {
      console.log('Failed to get user');
      return null;
    }
    set({ user });
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  },
}));

export default useUser;
