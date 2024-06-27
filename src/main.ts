import { createApp } from 'vue'
import App from './App.vue'
import './styles/index'
import store from '@/store/index'
import { mountSetting } from '@/setting'
import { mountRoute } from '@/router'


async function mountApp() {
  const app = createApp(App);
  app.use(store);
  mountSetting();
  await mountRoute(app);
  app.mount('#app');
}

mountApp();


