import { defineStore } from "pinia";
import type { TabsState } from "./types";

const useTabsStore = defineStore({
  id: 'tabs-store',
  state: (): TabsState => ({
    tabsList: []
  }),
  actions: {

  }
});

export default useTabsStore;