import { VuexModule, Module, Mutation } from 'vuex-class-modules';
import { storeInstance } from 'src/store';
import { UserStore } from 'src/store/modules';

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
      }
    })
  }
}
// register module (could be in any file)
export const AppStore = new AppModule({ store: storeInstance, name: 'App' });