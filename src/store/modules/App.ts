import { VuexModule, Module, Mutation } from 'vuex-class-modules';
import { storeInstance } from 'src/store';
import { UserStore } from 'src/store/modules';
import { Notify } from 'quasar'

@Module({ generateMutationSetters: true })
class AppModule extends VuexModule
{
  errors: string[] = [];
  version = 0.01;

  @Mutation
  handleErrors (_errors: string[])
  {
    this.errors = _errors;
    console.log('Handle Errors', this.errors);
    this.errors.forEach(_error =>
    {
      if (String(_error).includes('401'))
      {
        UserStore.logout();
      } else
      {
        let icon = 'mdi-alert';
        // Network Error
        if (String(_error).toLocaleLowerCase().includes('network error'))
          icon = 'mdi-signal-off';
        // else if (String(_error).toLocaleLowerCase().includes('network error'))
        Notify.create({
          message: String(_error),
          icon: icon,
          color: 'negative',
        })
      }
    })
  }
}
// register module (could be in any file)
export const AppStore = new AppModule({ store: storeInstance, name: 'App' });