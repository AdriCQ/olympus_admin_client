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
    },
    {
      path: 'ann',
      component: () => import('pages/extra/AnnouncementsPage.vue'),
      name: 'main.ann'
    },

    {
      path: 'ann/edit',
      component: () => import('pages/extra/EditAnnouncement.vue'),
      name: 'main.ann.edit'
    }
  ],
};
