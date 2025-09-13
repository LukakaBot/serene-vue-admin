import type { App } from "vue";
import { auth } from "./auth";

const directives = {
  auth,
};

export function setupDirectives(app: App) {
  Object.entries(directives).forEach(([key, directive]) => {
    app.directive(key, directive);
  });
}
