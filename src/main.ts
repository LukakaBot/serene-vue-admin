import { createApp } from 'vue';
import TlbsMap from 'tlbs-map-vue';
import 'virtual:svg-icons-register';
import App from './App.vue';
import LoadingApp from './layouts/LoadingApp/LoadingApp.vue';
import './styles/index';
import setupStore from '@/store';
import setupPlugins from '@/plugins';
import { setupDirectives } from './directives';
import router, { setupRouter } from '@/router';

async function mountApp() {
  const loadingApp = createApp(LoadingApp);

  loadingApp.mount('#app-loading');

  const app = createApp(App);

  setupStore(app);

  setupDirectives(app);

  setupPlugins();

  app.use(TlbsMap);

  setupRouter(app);

  await router.isReady();

  loadingApp.unmount();

  app.mount('#app');
}

mountApp();


