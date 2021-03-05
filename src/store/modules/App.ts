import { VuexModule, Module, Mutation } from 'vuex-class-modules';
import { storeInstance } from 'src/store';
// import { UserStore } from 'src/store/modules';
import { Notify } from 'quasar'
@Module({ generateMutationSetters: true })
class AppModule extends VuexModule
{
  errors: string[] = [];
  version = 0.1;

  @Mutation
  handleErrors (_errors: string[])
  {
    this.errors = _errors;
    // console.log('Handle Errors', this.errors);
    this.errors.forEach((_error: string) =>
    {
      let icon = 'mdi-alert';
      // Network Error
      console.log(String(_error).toLocaleLowerCase());
      if (String(_error).toLocaleLowerCase().includes('network error'))
      {
        _error = 'Error en la Red';
        icon = 'mdi-signal-off';
      }
      Notify.create({
        message: String(_error),
        icon: icon,
        color: 'negative',
      })

    })
  }
}
// register module (could be in any file)
export const AppStore = new AppModule({ store: storeInstance, name: 'App' });