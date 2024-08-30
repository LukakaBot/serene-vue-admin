import { createApp } from 'vue';
import TlbsMap from 'tlbs-map-vue';
import App from './App.vue';
import AppLoading from './layouts/AppLoading/AppLoading.vue';
import './styles/index';
import { mountStore } from '@/store/index';
import { mountSetting } from '@/setting';
import { mountRoute } from '@/router';
import 'virtual:svg-icons-register';

async function mountApp() {
  const appLoading = createApp(AppLoading);
  appLoading.mount('#app-loading');
  const app = createApp(App);
  mountStore(app);
  mountSetting();
  await mountRoute(app);
  app.use(TlbsMap);
  appLoading.unmount();
  app.mount('#app');
}

mountApp();


