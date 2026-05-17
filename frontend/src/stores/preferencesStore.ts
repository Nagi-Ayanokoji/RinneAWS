import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from '../api/client';

export interface Preferences {
  background_type: 'solid' | 'gradient' | 'image';
  background_value: string;
  hud_color: string;
}

interface PreferencesState {
  preferences: Preferences;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  fetchPreferences: () => Promise<void>;
  updatePreferences: (prefs: Partial<Preferences>) => Promise<void>;
}

const defaultPreferences: Preferences = {
  background_type: 'solid',
  background_value: '#131315',
  hud_color: '#00dbe9'
};

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set, get) => ({
      preferences: defaultPreferences,
      isOpen: false,
      setIsOpen: (isOpen) => set({ isOpen }),
      fetchPreferences: async () => {
        try {
          const res = await api.get('/preferences');
          if (res.data && res.data.preferences) {
            set({ preferences: res.data.preferences });
          }
        } catch (err) {
          console.error('Error fetching preferences:', err);
        }
      },
      updatePreferences: async (prefs) => {
        try {
          const newPrefs = { ...get().preferences, ...prefs };
          set({ preferences: newPrefs });
          await api.put('/preferences', newPrefs);
        } catch (err) {
          console.error('Error updating preferences:', err);
        }
      }
    }),
    { name: 'rinne-preferences', partialize: (state) => ({ preferences: state.preferences }) }
  )
);
