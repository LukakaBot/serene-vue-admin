import { createApp } from 'vue';
import TlbsMap from 'tlbs-map-vue';
import 'virtual:svg-icons-register';
import App from './App.vue';
import AppLoading from './layouts/AppLoading/AppLoading.vue';
import './styles/index';
import { setupStore } from '@/store/index';
import { setupNaiveDiscrete } from '@/plugins/naiveDiscrete';
import router, { setupRoute } from '@/router';
import { setupDirectives } from './directives';

async function mountApp() {
  const appLoading = createApp(AppLoading);

  appLoading.mount('#app-loading');

  const app = createApp(App);

  setupStore(app);

  setupNaiveDiscrete();

  setupDirectives(app);

  app.use(TlbsMap);

  setupRoute(app);

  await router.isReady();

  appLoading.unmount();

  app.mount('#app');
}

mountApp();


