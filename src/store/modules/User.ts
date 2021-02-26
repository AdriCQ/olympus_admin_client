import { VuexModule, Module, Mutation, Action } from 'vuex-class-modules';
import { storeInstance } from 'src/store';
import { IUserService, IUserStore } from 'src/types';
import { UserInstance } from 'src/helpers';
import { ServiceProvider, UserService } from 'src/services';
import { LocalStorage } from 'quasar'

@Module({ generateMutationSetters: true })
class UserModule extends VuexModule
{
  profile: IUserStore.User = UserInstance;
  api_token: string | null = null;

  get isLogged ()
  {
    return this.api_token ? true : false;
  }

  get userName ()
  {
    return this.profile.name;
  }

  /**
   * Mutations set user profile
   * @param _profile 
   */
  @Mutation
  setProfile (_profile: IUserStore.User)
  {
    this.profile = _profile;
  }

  /**
   * Actions Login user
   * @param _params 
   * @returns  
   */
  @Action
  loginAction (_params: IUserService.LoginRequest)
  {
    return new Promise((_resolve, _reject) =>
    {
      void ServiceProvider.callableService(UserService.login(_params), (_serviceResponse: IUserService.AuthResponse) =>
      {
        this.api_token = _serviceResponse.api_token;
        this.setProfile(_serviceResponse.profile);
        this.storeOnLocalStorage();
        _resolve(_serviceResponse);
      }).catch(error => _reject(error));
    })
  }

  logout ()
  {
    this.profile = UserInstance;
    this.api_token = null;
    this.storeOnLocalStorage();
  }

  storeOnLocalStorage ()
  {
    LocalStorage.set('storage/user', {
      api_token: this.api_token,
      profile: this.profile
    })

  }

  getFromLocalStorage ()
  {
    if (LocalStorage.has('storage/user'))
    {
      const localData: IUserService.AuthResponse = LocalStorage.getItem('storage/user') as IUserService.AuthResponse;
      this.api_token = localData.api_token;
      this.profile = localData.profile;
    }
  }
}

// register module (could be in any file)
export const UserStore = new UserModule({ store: storeInstance, name: 'User' });