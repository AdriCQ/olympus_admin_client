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
  void UserStore.getFromLocalStorage().then(() =>
  {
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
  }).catch(_err => alert(String(_err)));

}

export const NoAuthGuard: NavigationGuard = (to, from, next) =>
{
  void UserStore.getFromLocalStorage().then(() =>
  {

    if (UserStore.isLogged)
    {
      next({
        name: 'main.home'
      })
    }
  }).catch(_err => alert(String(_err)));
}