import type { DirectiveBinding, ObjectDirective } from "vue";
import { useRouteStore } from "@/store";

export const auth: ObjectDirective = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { value }: { value: string } = binding;

    if (!value) {
      throw new Error(
        "[Directive/auth]: Authorization value is missing or empty.",
      );
    }

    const { auths } = useRouteStore().currentRoute.meta as AppRoute.Meta;
    if (!auths) {
      throw new Error(
        '[Directive/auth]: "auths" field is missing in current route meta.',
      );
    }
    const hasAuth = auths.some((auth) => auth.name === value);

    if (!hasAuth) {
      el.parentNode?.removeChild(el);
    }
  },
};
