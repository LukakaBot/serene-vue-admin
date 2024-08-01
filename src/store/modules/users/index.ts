import { defineStore } from "pinia";
import type { UserState } from './types';
import { fetchUserInfo } from "@/api/users";

export const useUserStore = defineStore({
  id: 'user-store',
  state: (): UserState => ({
    userInfo: {}
  }),
  actions: {
    async getUserInfo() {
      this.userInfo = await fetchUserInfo();
    }
  }
})