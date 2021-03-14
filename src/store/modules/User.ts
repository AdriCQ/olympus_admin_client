import { VuexModule, Module, Mutation, Action } from 'vuex-class-modules';
import { storeInstance } from 'src/store';
import { IUserService, IUserStore } from 'src/types';
import { UserInstance, CapacitorHelper } from 'src/helpers';
import { ServiceProvider, UserService } from 'src/services';

const STORAGE_KEY = 'vuex/UserStore';
interface ILocalStorage
{
  profile: IUserStore.User;
  api_token: string | null;
}

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
   * Filter Actions user module
   * @param _params 
   * @returns action 
   */
  @Action
  filterAction (_params: IUserService.FilterRequest): Promise<IUserStore.User[]>
  {
    return new Promise((_resolve, _reject) =>
    {
      void ServiceProvider.callableService(UserService.filter(_params), (_resp: IUserStore.User[]) =>
      {
        _resolve(_resp);
      }).catch(_err => _reject(_err))
    })
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
    console.log('Logout')
    this.profile = UserInstance;
    this.api_token = null;
    this.storeOnLocalStorage();
  }

  storeOnLocalStorage ()
  {
    void CapacitorHelper.Storage_set(STORAGE_KEY, {
      api_token: this.api_token,
      profile: this.profile
    }).catch(_err => console.log('Error set localstorage user Data', _err));

  }

  @Action
  getFromLocalStorage ()
  {
    return new Promise((_resolve, _reject) =>
    {
      CapacitorHelper.Storage_get<ILocalStorage>(STORAGE_KEY).then(_resp =>
      {
        if (_resp)
        {
          this.api_token = _resp?.api_token;
          this.profile = _resp?.profile;
        }
        _resolve(true);
      }).catch(_err => _reject(_err));
    })
  }
}

// register module (could be in any file)
export const UserStore = new UserModule({ store: storeInstance, name: 'User' });