import { VuexModule, Module, Mutation, Action } from 'vuex-class-modules';
import { storeInstance } from 'src/store';
// import { UserStore } from 'src/store/modules';
import { Notify } from 'quasar'
import { IOlympusService } from 'src/types';
import { ServiceProvider, OlympusService } from 'src/services';
@Module({ generateMutationSetters: true })
class AppModule extends VuexModule
{
  errors: string[] = [];
  version = 0.1;

  // palrey_daily_visits = 0;
  palrey: IOlympusService.Application | null = null;

  @Mutation
  handleErrors (_errors: string[])
  {
    this.errors = _errors;
    console.log('Handle Errors', _errors);
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

  /**
   * Actions get shop product by id
   * @param _id 
   * @returns Promise<IShopStore.Product>
   */
  @Action
  setSettingsAction (_params: IOlympusService.SettingsRequest): Promise<IOlympusService.Application>
  {
    return new Promise((_resolve, _reject) =>
    {
      void ServiceProvider.callableService(OlympusService.setAppSettings(_params), (_resp: IOlympusService.Application) =>
      {
        this.palrey = _resp;
        _resolve(_resp);
      }).catch(_error => _reject(_error));

    });
  }
}
// register module (could be in any file)
export const AppStore = new AppModule({ store: storeInstance, name: 'App' });