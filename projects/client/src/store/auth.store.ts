import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import Auth from '@/models/auth.model';

type AuthStore = {
  auth: Auth | null;
  login: (auth: Auth) => void;
  logout: () => void;
};

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      auth: null,
      login: (auth: Auth) => set({ auth }),
      logout: () => set({ auth: null }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
