import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useShallow } from "zustand/react/shallow";

interface SettingsState {
  colorPrimary: string;
  setColorPrimary: (value: string) => void;
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}

const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      colorPrimary: "#1DA57A",
      setColorPrimary: (colorPrimary) => set({ colorPrimary }),
      collapsed: false,
      setCollapsed: (collapsed) => set({ collapsed }),
    }),
    { name: "app-settings" },
  ),
);

export const useSettingsState = () =>
  useSettingsStore(
    useShallow((state) => ({
      colorPrimary: state.colorPrimary,
      setColorPrimary: state.setColorPrimary,
      collapsed: state.collapsed,
      setCollapsed: state.setCollapsed,
    })),
  );
