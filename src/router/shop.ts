import { RouteConfig } from 'vue-router';
import { AuthGuard } from './guards';

export const shopRoutes: RouteConfig = {
  path: '/shop',
  component: () => import('layouts/MainLayout.vue'),
  beforeEnter: AuthGuard,
  children: [
    {
      name: 'shop.orders',
      path: 'orders',
      component: () => import('pages/shop/OrdersPage.vue'),
    },
    {
      name: 'shop.products',
      path: 'products',
      component: () => import('pages/shop/ProductsPage.vue'),
    },
    {
      name: 'shop.product.details',
      path: 'product/details',
      component: () => import('pages/shop/ProductDetailsPage.vue'),
    },
    {
      name: 'shop.product.edit',
      path: 'product/edit',
      component: () => import('pages/shop/ProductEditPage.vue'),
    },
  ],
};