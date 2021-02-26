// import { store } from 'quasar/wrappers';
// import Vuex from 'vuex';

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

// export interface StateInterface
// {
//   // Define your own store structure, using submodules if needed
//   // example: ExampleStateInterface;
//   // Declared as unknown to avoid linting issue. Best to strongly type as per the line above.
//   shop: ShopStore.state;
// }

// export default store(function ({ Vue })
// {
//   Vue.use(Vuex);

//   const Store = new Vuex.Store<any>({
//     modules: {
//     },

//     // enable strict mode (adds overhead!)
//     // for dev mode only
//     strict: !!process.env.DEBUGGING
//   });

//   return Store;
// });

import { store } from 'quasar/wrappers'
import Vuex from 'vuex'
import Vue from 'vue';
Vue.use(Vuex);

export const storeInstance = new Vuex.Store<unknown>({
  state: {
  },
  mutations: {
  },
  actions: {},
  modules: {},
  strict: !!process.env.NODE_ENV
})

export default store(({ }) =>
{
  return storeInstance;
})