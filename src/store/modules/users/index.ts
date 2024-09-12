import { defineStore } from "pinia";
import type { UserState } from './types';
import type { UserInfo } from "@/api/users/types";
import { fetchUserInfo } from "@/api/users";

export const useUserStore = defineStore({
  id: 'user-store',
  state: (): UserState => ({
    userInfo: {} as UserInfo
  }),
  actions: {
    async getUserInfo() {
      this.userInfo = await fetchUserInfo();
    }
  }
})