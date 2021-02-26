import { IUserStore } from '../store/user';

export namespace IUserService
{
  /**
   * Login request
   */
  interface LoginRequest
  {
    mobile_phone: string;
    password: string;
  }
  /**
   * Register request
   */
  interface RegisterRequest
  {
    name: string;
    // last_name: string;
    mobile_phone: string;
    password: string;
    password_confirmation: string;
  }

  /**
   * Auth response
   */
  interface AuthResponse
  {
    profile: IUserStore.User;
    api_token: string;
  }
}