import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsState {
  colorPrimary: string;
  setColorPrimary: (value: string) => void;
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      colorPrimary: "#1DA57A",
      setColorPrimary: (colorPrimary) => set({ colorPrimary }),
      collapsed: false,
      setCollapsed: (collapsed) => set({ collapsed }),
    }),
    {
      name: "app-settings",
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) => ["colorPrimary", "collapsed"].includes(key)),
        ),
    },
  ),
);
