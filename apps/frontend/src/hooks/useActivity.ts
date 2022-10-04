import { watch } from 'vue';

import { check } from '@services/auth';
import { useUserStore } from '@store/useUserStore';

const FIFTEEN_MINUTES = 1000 * 60 * 15;

// I don't know if this is necessary but just in case...
// This is going to refresh the cookie so the user will never logout by inactivity if the tab is still opened
export function useActivity() {
  const userStore = useUserStore();

  let intervalId: NodeJS.Timer | null = null;

  watch(userStore, () => {
    if (userStore.isAuthenticated) {
      if (!intervalId) {
        intervalId = setInterval(async () => {
          await check();
        }, FIFTEEN_MINUTES);
      }
    } else {
      if (intervalId) {
        clearInterval(intervalId);
      }
    }
  });
}
