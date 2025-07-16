import { createApp } from 'vue';
import TlbsMap from 'tlbs-map-vue';
import 'virtual:svg-icons-register';
import App from './App.vue';
import AppLoading from './layouts/AppLoading/AppLoading.vue';
import './styles/index';
import { setupStore } from '@/store/index';
import { setupNaiveDiscrete } from '@/plugins/naiveDiscrete';
import { setupDirectives } from './directives';
import { setupBucket } from '@/plugins/bucket';
import router, { setupRouter } from '@/router';

async function mountApp() {
  const appLoading = createApp(AppLoading);

  appLoading.mount('#app-loading');

  const app = createApp(App);

  setupStore(app);

  setupNaiveDiscrete();

  setupDirectives(app);

  setupBucket();

  app.use(TlbsMap);

  setupRouter(app);

  await router.isReady();

  appLoading.unmount();

  app.mount('#app');
}

mountApp();


