import { RouteConfig } from 'vue-router';
import AuthLayout from 'layouts/AuthLayout.vue';

export const authRoutes: RouteConfig = {
  path: '/auth',
  component: AuthLayout,
  children: [
    {
      name: 'auth.login',
      path: 'login',
      component: () => import('src/pages/auth/LoginPage.vue'),
      // component: () => import('src/components/widgets/Map.vue'),
    },
  ],
};
