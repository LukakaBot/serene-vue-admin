import type { App } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { useConfigStore } from './modules/config';
import { useRouteStore } from './modules/route';
import { useTabStore } from './modules/tab';
import { useThemeStore } from './modules/theme';
import { useUserStore } from './modules/users';

export const store = createPinia();
store.use(piniaPluginPersistedstate);

export function setupStore(app: App<Element>) {
  app.use(store);
}

export { useConfigStore, useRouteStore, useTabStore, useThemeStore, useUserStore };
