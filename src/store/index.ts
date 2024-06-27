import { createPinia } from 'pinia';
import useRouteStore from './modules/route';

const store = createPinia();

export { useRouteStore };

export default store;

