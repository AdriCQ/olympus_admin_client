/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import axios, { AxiosInstance } from 'axios';
import { boot } from 'quasar/wrappers';
import { SERVER_API_URL, APP_TOKEN } from 'src/helpers';
import { UserStore } from 'src/store/modules';
// import { UserStore } from 'src/store/modules';

declare module 'vue/types/vue' {
  interface Vue
  {
    $axios: AxiosInstance;
  }
}


export default boot(({ Vue }) =>
{
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  Vue.prototype.$axios = axios;
  axios.defaults.timeout = 10000;
  axios.defaults.baseURL = SERVER_API_URL;
  // axios.defaults.withCredentials = true;
  axios.interceptors.request.use((request) =>
  {
    /* Append content type header if its not present */
    if (!request.headers['Content-Type'])
    {
      request.headers['Content-Type'] = 'application/json';
    }
    /* Check if authorization is set */
    if (!request.headers['Authorization'])
    {
      /* Check if the user is authenticated to send Bearer token */
      const token = UserStore.api_token;
      if (token && token.length > 0)
      {
        request.headers.Authorization = 'Bearer ' + token;
      } else
      {
        /* Send the application authentication as Bearer token */
        request.headers.Authorization = 'Bearer ApiToken';
      }
    }
    if (!request.params)
    {
      request.params = {};
    }
    if (!request.params['ol_app_token'])
    {
      request.params['ol_app_token'] = APP_TOKEN
    }
    return request;
  });
});
