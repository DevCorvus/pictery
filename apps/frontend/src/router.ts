import { createRouter, createWebHistory } from 'vue-router';

import Dashboard from '@pages/DashboardPage.vue';
import Gallery from '@pages/GalleryPage.vue';
import Home from '@pages/HomePage.vue';
import Login from '@pages/LoginPage.vue';
import MyProfile from '@pages/MyProfilePage.vue';
import NotFound from '@pages/NotFoundPage.vue';
import Profile from '@pages/ProfilePage.vue';
import Register from '@pages/RegisterPage.vue';
import { useMainStore } from '@store/useMainStore';
import { useUserStore } from '@store/useUserStore';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        guard: 'guest',
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        guard: 'guest',
      },
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        guard: 'guest',
      },
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        guard: 'protected',
      },
    },
    {
      path: '/profile',
      name: 'MyProfile',
      component: MyProfile,
      meta: {
        guard: 'protected',
      },
    },
    {
      path: '/profile/:id',
      name: 'Profile',
      component: Profile,
      meta: {
        guard: 'protected',
      },
    },
    {
      path: '/gallery/:id',
      name: 'Gallery',
      component: Gallery,
      meta: {
        guard: 'protected',
      },
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFound,
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const { guard } = to.meta;
  const mainStore = useMainStore();
  const userStore = useUserStore();
  let isAuthenticated: boolean;

  if (userStore.isAuthenticated === null) {
    isAuthenticated = await userStore.setAuth();
    await userStore.setProfile();
    mainStore.setInitialized(true);
  } else {
    isAuthenticated = userStore.isAuthenticated;
  }

  switch (guard) {
    case 'protected':
      if (isAuthenticated) {
        return next();
      } else {
        return next({ name: 'Login' });
      }
    case 'guest':
      if (!isAuthenticated) {
        return next();
      } else {
        return next({ name: 'Dashboard' });
      }
    default:
      return next();
  }
});
