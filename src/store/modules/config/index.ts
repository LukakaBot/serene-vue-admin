import { defineStore } from "pinia";
import type { ConfigState } from "./types";
import { useThemeStore } from "../theme";

export const useConfigStore = defineStore({
  id: 'config-store',
  state: (): ConfigState => {
    const themeStore = useThemeStore(); // 引用 themeStore

    return {
      showWatermark: true,
      watermarkContent: 'serene-admin',
      isDarkMode: false,
      theme: themeStore.$state,
    }
  },
  persist: true,
  actions: {
    /**
     * 更新主题模式为指定的布尔值
     * @param value - 要设置的主题模式值，true 为深色模式，false 为浅色模式
     */
    updateDarkMode(value: boolean) {
      this.isDarkMode = value;
    },
    /**
     * 切换主题模式，深色模式和浅色模式之间切换
     */
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
    }
  }
});