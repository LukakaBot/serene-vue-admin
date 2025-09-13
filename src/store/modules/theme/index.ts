import type { GlobalThemeOverrides } from "naive-ui";
import type { ThemeState } from "./types";
import { defineStore } from "pinia";

export const useThemeStore = defineStore("theme", {
  state: (): ThemeState => {
    return {
      appTheme: {
        Scrollbar: {
          width: "8px",
          height: "8px",
        },
      },
    };
  },
  persist: true,
  actions: {
    /** 获取应用主题 */
    getAppTheme(): GlobalThemeOverrides {
      return this.appTheme;
    },
  },
});
