import { create } from "zustand";

type State = {
  a: number;
  addA: () => void;
  b: number;
  addB: () => void;
};

export const useTestStore = create<State>()((set) => {
  return {
    a: 1,
    addA: () => set((state) => ({ a: state.a + 1 })),
    b: 2,
    addB: () => set((state) => ({ b: state.b + 1 })),
  };
});
