import { create } from "zustand";

type Store = {};

const InitialState = {};

export const useGlobalStore = create<Store>()((set) => ({
  ...InitialState,
}));
