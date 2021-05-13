import { RouteConfig } from 'vue-router';
import { AuthGuard } from './guards';

export const mainRoutes: RouteConfig =
{
  path: '/main',
  component: () => import('layouts/MainLayout.vue'),
  beforeEnter: AuthGuard,
  children: [
    {
      path: '',
      // component: () => import('pages/Index.vue'),
      redirect: { name: 'shop.orders' },
      name: 'main.home'
    },
    {
      path: 'stats',
      component: () => import('pages/StatsPage.vue'),
      name: 'main.stats'
    },
    {
      path: 'settings',
      component: () => import('pages/SettingsPage.vue'),
      name: 'main.settings'
    }
  ],
};
