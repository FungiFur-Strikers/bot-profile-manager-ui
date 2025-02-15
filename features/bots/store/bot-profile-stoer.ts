import { create } from "zustand";
import { Bot } from "../types";

interface Store {
  botList: Bot[];
  setBotList: (bots: Bot[]) => void;
}

export const useBotProfileStore = create<Store>((set) => ({
  botList: [],
  setBotList: (botList) => set(() => ({ botList })),
}));
