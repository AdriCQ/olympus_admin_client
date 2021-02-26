import { RouteConfig } from 'vue-router';
import { AuthGuard } from './guards';

export const mainRoutes: RouteConfig =
{
  path: '/main',
  component: () => import('layouts/MainLayout.vue'),
  beforeEnter: AuthGuard,
  children: [
    { path: '', component: () => import('pages/Index.vue'), name: 'main.home' }
  ],
};
