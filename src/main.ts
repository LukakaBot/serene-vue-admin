import { createApp } from 'vue';
import App from './App.vue';
import './styles/index';
import { mountStore } from '@/store/index';
import { mountSetting } from '@/setting';
import { mountRoute } from '@/router';
import 'virtual:uno.css';
import 'virtual:svg-icons-register';
import TlbsMap from 'tlbs-map-vue';

async function mountApp() {
  const app = createApp(App);
  mountStore(app);
  mountSetting();
  await mountRoute(app);
  app.use(TlbsMap);
  app.mount('#app');
}

mountApp();


