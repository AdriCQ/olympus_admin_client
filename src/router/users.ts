import { RouteConfig } from 'vue-router';
import MainLayout from 'layouts/MainLayout.vue';

export const userRoutes: RouteConfig = {
  path: '/user',
  component: MainLayout,
  children: [
    {
      name: 'user.home',
      path: 'home',
      component: () => import('pages/users/UserHomePage.vue'),
    },
  ],
};