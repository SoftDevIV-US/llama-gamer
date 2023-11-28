import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import Auth from '@/models/auth.model';

type AuthStore = {
  auth: Auth | null;
  login: (auth: Auth) => void;
  logout: () => void;
  refreshToken: (token: string) => void;
};

const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      auth: null,
      login: (auth: Auth) => set({ auth }),
      logout: () => set({ auth: null }),
      refreshToken: (token: string) => {
        const { auth } = get();
        if (auth) {
          set({ auth: { ...auth, token } });
        }
      },
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
