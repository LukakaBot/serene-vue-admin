import TlbsMap from "tlbs-map-vue";
import { createApp } from "vue";
import setupPlugins from "@/plugins";
import router, { setupRouter } from "@/router";
import setupStore from "@/store";
import App from "./App.vue";
import { setupDirectives } from "./directives";
import LoadingApp from "./layouts/LoadingApp/LoadingApp.vue";
import "virtual:svg-icons-register";
import "./styles/index";

async function mountApp() {
  const loadingApp = createApp(LoadingApp);

  loadingApp.mount("#app-loading");

  const app = createApp(App);

  setupStore(app);

  setupDirectives(app);

  setupPlugins();

  app.use(TlbsMap);

  setupRouter(app);

  await router.isReady();

  loadingApp.unmount();

  app.mount("#app");
}

mountApp();
