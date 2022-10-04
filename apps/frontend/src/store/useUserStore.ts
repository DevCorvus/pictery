import { Profile } from '@common/interfaces';
import { AxiosError } from 'axios';
import { defineStore } from 'pinia';

import * as authService from '@services/auth';
import { getMyProfile } from '@services/user';

import { useMainStore } from './useMainStore';

interface State {
  isAuthenticated: boolean | null;
  profile: Profile | null;
}

export const useUserStore = defineStore('user', {
  state: (): State => ({
    isAuthenticated: null,
    profile: null,
  }),
  actions: {
    async setAuth() {
      const mainStore = useMainStore();

      try {
        await authService.check();
        this.isAuthenticated = true;
        return true;
      } catch (err) {
        if (err instanceof AxiosError) {
          const status = err.response?.status;
          if (status === 0) {
            mainStore.setErrorMode(true);
          }
        }
        this.isAuthenticated = false;
        return false;
      }
    },
    async setProfile() {
      if (this.isAuthenticated) {
        const profile = await getMyProfile();
        this.profile = profile;
      }
    },
    async logout() {
      await authService.logout();
      this.isAuthenticated = false;
      this.profile = null;
    },
  },
});
