import { createPinia } from 'pinia';
import useRouteStore from './modules/route';
import useThemeStore from './modules/theme';
import useTabsStore from './modules/tabs';

const store = createPinia();

export { useRouteStore, useThemeStore, useTabsStore };

export default store;

