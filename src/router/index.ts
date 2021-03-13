import { route } from 'quasar/wrappers';
import VueRouter from 'vue-router';
import { Store } from 'vuex';
import { mainRoutes } from './main';
import { authRoutes } from './auth';
import { shopRoutes } from './shop';
import { userRoutes } from './users';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default route<Store<unknown>>(function ({ Vue })
{
  Vue.use(VueRouter);

  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes: [
      {
        path: '/',
        redirect: { name: 'main.home' }
      },
      mainRoutes, authRoutes, shopRoutes, userRoutes,
      // Always leave this as last one,
      // but you can also remove it
      {
        path: '*',
        component: () => import('pages/Error404.vue')
      }
    ],
    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  });

  return Router;
})
