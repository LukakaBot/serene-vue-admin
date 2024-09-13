import type { App } from 'vue';
import { createPinia } from 'pinia';
import { useRouteStore } from './modules/route';
import { useThemeStore } from './modules/theme';
import { useTabStore } from './modules/tab';
import { useUserStore } from './modules/users';

export const store = createPinia();

export function mountStore(app: App<Element>) {
  app.use(store);
}

export { useRouteStore, useThemeStore, useTabStore, useUserStore };
