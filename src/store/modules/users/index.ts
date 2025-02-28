import { defineStore } from "pinia";
import type { UserState } from './types';
import type { UserTokenAccountParams, UserInfo } from "@/api/users/types";
import { fetchUserTokenByAccount } from "@/api/users";
import router from "@/router";

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    userInfo: {} as UserInfo
  }),
  actions: {
    async getUserTokenByAccount(params: UserTokenAccountParams) {
      this.userInfo = await fetchUserTokenByAccount(params);
      window.$bucket?.set('token', this.userInfo.token);
    },
    logout() {
      window.$bucket?.remove('token');
      this.userInfo = {} as UserInfo;
      router.replace({ path: '/login' });
    }
  }
})