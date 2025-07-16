import { defineStore } from "pinia";
import type { UserState } from './types';
import type { UserTokenAccountParams } from "@/api/users/types";
import { fetchUserTokenByAccount } from "@/api/users";
import router from "@/router";

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    userInfo: null,
  }),
  actions: {
    async getUserTokenByAccount(params: UserTokenAccountParams) {
      this.userInfo = await fetchUserTokenByAccount(params);
      window.$bucket?.set('token', this.userInfo.token);
    },
    logout() {
      window.$bucket?.remove('token');
      this.userInfo = null;
      router.replace({ path: '/login' });
    }
  }
})