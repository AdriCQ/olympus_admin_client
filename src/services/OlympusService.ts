import axios from 'axios';
import { IServices, IOlympusService } from 'src/types';

/**
 * 
 */
export class OlympusService
{
  private static BASE_URL = '/olympus';

  /**
   * Checks for updates
   * @param [_currentVersion] 
   * @returns for updates 
   */
  static checkForUpdates (_currentVersion = 0): IServices.ApiResponse<IOlympusService.CheckForUpdatesResponse>
  {
    return axios.get(this.BASE_URL + '/app/updates', {
      params: {
        ol_app_version: _currentVersion
      }
    })
  }

  /**
   * Gets unread notifications
   * @returns  
   */
  static getUnreadNotifications (): IServices.ApiResponse<string[]>
  {
    return axios.get(this.BASE_URL + '/notification');
  }

  /**
  * Gets unread notifications
  * @returns  
  */
  static getAdminUnreadNotifications (): IServices.ApiResponse<string[]>
  {
    return axios.get(this.BASE_URL + '/notification/a-unread');
  }

  /**
   * Gets app info
   * @param _app_token 
   * @returns app info 
   */
  static getAppInfo (_app_token: string): IServices.ApiResponse<IOlympusService.Application> 
  {
    return axios.get(this.BASE_URL + '/app', { params: { app_token: _app_token } });
  }

  /**
   * Sets app settings
   * @param _params 
   * @returns app settings 
   */
  static setAppSettings (_params: IOlympusService.SettingsRequest): IServices.ApiResponse<IOlympusService.Application>
  {
    return axios.post(this.BASE_URL + '/app/settings', _params);
  }
}