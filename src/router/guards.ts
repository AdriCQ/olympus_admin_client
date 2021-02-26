import { UserStore } from 'src/store/modules';

import { NavigationGuard } from 'vue-router';

/**
 * Auth Guard
 * @param to Route
 * @param from Route
 * @param next 
 */
export const AuthGuard: NavigationGuard = (to, from, next) =>
{
  UserStore.getFromLocalStorage();
  if (!UserStore.isLogged)
  {
    next({
      name: 'auth.login',
      query: {
        redirect: to.name
      }
    })
  } else
  {
    next();
  }
}

export const NoAuthGuard: NavigationGuard = (to, from, next) =>
{
  UserStore.getFromLocalStorage();
  if (UserStore.isLogged)
  {
    next({
      name: 'main.home'
    })
  }
}