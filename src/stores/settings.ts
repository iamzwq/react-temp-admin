import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useShallow } from "zustand/react/shallow";

const initialState = {
  colorPrimary: "#1DA57A",
  collapsed: false,
};

export const useSettingsStore = create<typeof initialState>()(
  persist(() => initialState, { name: "app-settings" }),
);

export const useShallowSettingsStore = () =>
  useSettingsStore(
    useShallow((state) => ({
      colorPrimary: state.colorPrimary,
      collapsed: state.collapsed,
    })),
  );

export function setColorPrimary(colorPrimary: string) {
  useSettingsStore.setState({ colorPrimary });
}

export function setCollapsed(collapsed: boolean) {
  useSettingsStore.setState({ collapsed });
}
