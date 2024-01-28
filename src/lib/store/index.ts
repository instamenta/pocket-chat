import { create } from 'zustand';
import { I_UserSchema } from '../types';
import { acceptFriendRequest } from '@/lib/queries/user';

interface IUserStore {
  user: I_UserSchema;
  fetchUser: () => Promise<void>;
  logout: () => void;
  setUser: (newUser: I_UserSchema) => void;
  isAuthenticated: () => boolean;
}

const emptyUser: I_UserSchema = {
  id: '', username: '', email: '', password: '',
  first_name: '', last_name: '', picture: '',
  created_at: '', updated_at: '', last_active_at: ''
};

const useUser = create<IUserStore>((set, get) => ({
  user: emptyUser,
  logout: () => set({ user: { ...emptyUser } }),
  setUser: (newUser: I_UserSchema) => {
    set({ user: { ...newUser } });
    console.log(get());
  },
  isAuthenticated: () => get().user.id !== '',
  fetchUser: async () => {
    const user = await acceptFriendRequest();
    if (!user) throw new Error('Failed to auth user');
    set({ user });
  }
}));

export default useUser;
