import { defineStore } from "pinia";
import type { UserState } from './types';
import type { UserInfo } from "@/api/users/types";
import { fetchUserTokenByAccount } from "@/api/users";
import { useStorage } from "@/hooks/useStorage";

export const useUserStore = defineStore({
  id: 'user-store',
  state: (): UserState => ({
    userInfo: {} as UserInfo
  }),
  actions: {
    async getUserTokenByAccount(params: { username: string, password: string }) {
      this.userInfo = await fetchUserTokenByAccount(params);
      const { setCache: setTokenCache } = useStorage('localStorage', 'token');
      setTokenCache(this.userInfo.token);
    },
  }
})