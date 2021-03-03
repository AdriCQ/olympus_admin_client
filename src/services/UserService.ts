import { IUserService, IServices } from 'src/types';
import axios from 'axios';

/**
 * User service
 */
export class UserService
{
  private static BASE_PATH = '/user';

  /**
   * Prepares auth
   * @returns  
   */
  static prepareAuth ()
  {
    return axios.get('/sanctum/csrf-cookie');
  }

  /**
   * Logins user service
   * @param _params 
   * @returns login 
   */
  static sudoLogin (_params: IUserService.LoginRequest): IServices.ApiResponse<IUserService.AuthResponse>
  {
    return axios.post(this.BASE_PATH + '/su-login', _params);
  }

  /**
   * Logins user service
   * @param _params 
   * @returns login 
   */
  static login (_params: IUserService.LoginRequest): IServices.ApiResponse<IUserService.AuthResponse>
  {
    return axios.post(this.BASE_PATH + '/login', _params);
  }

  /**
   * Registers user service
   * @param _params 
   * @returns register 
   */
  static register (_params: IUserService.RegisterRequest): IServices.ApiResponse<IUserService.AuthResponse>
  {
    return axios.post(this.BASE_PATH + '/register', _params);
  }

  /**
   * Logouts user service
   * @returns  
   */
  static logout ()
  {
    return axios.post('/auth/logout');
  }
}