import { create } from 'zustand';
import { fetchProfile, login } from '../services/authService';

type User = {
    id: string;
    name: string;
    email: string;
};

type AuthStore = {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    loginUser: (email: string, password: string) => Promise<number>;
    fetchProfile: () => Promise<void>;
    logout: () => void;
};

const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    token: null,
    isLoading: false,

    loginUser: async (email, password): Promise<number> => {
        set({ isLoading: true });
        try {
            const res = await login(email, password);
            if (res.status !== 200) {
                console.error('Login failed with status:', res.status);
                return res.status;
            }
            const { token } = res.data;
            if (!token) {
                return res.status;
            }
            
            set({ token });
            const tokenPayload = JSON.parse(atob(token.split('.')[1]));
            const userId = tokenPayload.id;
            const profileRes = await fetchProfile(userId, token);
            set({ user: profileRes.data });
            return  res.status
        } catch (error: any) {
            return error.response?.status || 500; 

        } finally {
            set({ isLoading: false });
        }
    },

    fetchProfile: async () => {
        const state = useAuthStore.getState();
        const { user, token } = state;
        if (!user || !token) {
            console.warn('No user or token available to fetch profile');
            return;
        }
        const { id } = user;
        if (!id) {
            console.warn('No user ID available to fetch profile');
            return;
        }
        set({ isLoading: true });

        try {
            const res = await fetchProfile(id, token);
            if (!res || !res.data) {
                console.warn('No data received from fetchProfile');
                return;
            }
            set({ user: res.data });
        } catch (error) {
            console.error('Error al obtener perfil', error);
        } finally {
            set({ isLoading: false });
        }
    },

    logout: () => {
        set({ token: null, user: null });
    }
}));

export default useAuthStore;
export { useAuthStore };
