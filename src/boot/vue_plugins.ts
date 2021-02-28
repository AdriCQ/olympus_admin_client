/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { boot } from 'quasar/wrappers';
import Vuelidate from 'vuelidate';

export default boot(({ Vue }) =>
{
  Vue.use(Vuelidate);
});
