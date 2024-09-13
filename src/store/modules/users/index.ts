import { defineStore } from "pinia";
import type { UserState } from './types';
import type { UserTokenAccountParams, UserInfo } from "@/api/users/types";
import { fetchUserTokenByAccount } from "@/api/users";
import { useStorage } from "@/hooks/useStorage";
import router from "@/router";

export const useUserStore = defineStore({
  id: 'user-store',
  state: (): UserState => ({
    userInfo: {} as UserInfo
  }),
  actions: {
    async getUserTokenByAccount(params: UserTokenAccountParams) {
      this.userInfo = await fetchUserTokenByAccount(params);
      const { setCache: setTokenCache } = useStorage('localStorage', 'token');
      setTokenCache(this.userInfo.token);
    },
    logout() {
      const { removeCache: removeTokenCache } = useStorage('localStorage', 'token');
      removeTokenCache();
      this.userInfo = {} as UserInfo;
      router.replace({ path: '/login' });
    }
  }
})