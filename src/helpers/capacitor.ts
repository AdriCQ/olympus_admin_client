import axios from 'axios';
import { AppRestoredResult, CameraOptions, NetworkStatus, Plugins, ToastShowOptions, FilesystemDirectory, FileWriteResult } from '@capacitor/core';
import { IDictionary } from 'src/types';
const { App, Camera, Filesystem, Network, Storage, Toast } = Plugins;

interface IOnDownloadEvent
{
  loaded: number;
  total: number;
}
/**
 * Capacitor Helper
 */
export class CapacitorHelper
{

  downloadProgress = 0;
  /**
   * Exit App
   */
  static App_exitApp ()
  {
    return App.exitApp()
  }

  /**
   * 
   * @param _regsterEvents CallableFunction(_result: AppRestoredResult)
   */
  static App_listenRestoredResult (_regsterEvents: CallableFunction)
  {
    return App.addListener('appRestoredResult', (_restoreResult: AppRestoredResult) =>
    {
      _regsterEvents(_restoreResult);
    })
  }

  /**
   * Get a Camera photo
   * @param _options CameraOptions
   */
  static Camera_getPhoto (_options: CameraOptions)
  {
    return Camera.getPhoto(_options)
  }

  /**
   * Files system download app update
   * @param _url 
   * @param [_params] 
   * @returns Promise<FileWriteResult>
   */
  FileSystem_downloadAppUpdate (_url: string, _params?: IDictionary<unknown>): Promise<FileWriteResult>
  {
    return new Promise((_resolve, _reject) =>
    {
      void axios.get(_url, {
        responseType: 'blob',
        params: _params,
        // Handle Download Progress
        onDownloadProgress: (_event: IOnDownloadEvent) =>
        {
          this.downloadProgress = Math.round(
            (_event.loaded / _event.total) * 100
          )
        }
      }).then(_axiosResponse =>
      {
        // Turn blob into base64
        void new Promise((_bResolve, _bReject) =>
        {
          const reader = new FileReader();
          reader.onerror = _bReject;
          reader.onload = () =>
          {
            _bResolve(reader.result)
          }
          reader.readAsDataURL(_axiosResponse.data);
        }).then((_reader: unknown) =>
        {
          void Filesystem.writeFile({
            path: 'file.apk',
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            data: _reader as string,
            directory: FilesystemDirectory.Documents,
          }).then(_result => _resolve(_result)).catch(_err => _reject(_err))
        }).catch(_err => _reject(_err))
      }).catch(_err => _reject(_err))
    })
  }

  /**
   * Locals notifications schedule
   * @param _notifications 
   * @returns  
   */
  // static LocalNotifications_schedule (_notifications: LocalNotification[])
  // {
  //   LocalNotifications.schedule({
  //     notifications: [
  //       {
  //         title: 'Title',
  //         body: 'Body',
  //         id: 1,
  //         actionTypeId: '',
  //         extra: null
  //       }
  //     ]
  //   })
  // }

  /**
   * Get network status
   */
  static Network_getStatus (): Promise<NetworkStatus>
  {
    return Network.getStatus();
  }

  /**
   * Clear LocalStorage
   */
  static Storage_clear (): Promise<void>
  {
    return Storage.clear();
  }

  /**
   * Clear LocalStorage
   */
  static Storage_keys (): Promise<{ keys: string[] }>
  {
    return Storage.keys();
  }

  /**
   * Get data from LocalStorage
   * @param _key string
   */
  static Storage_get<T> (_key: string): Promise<T | null>
  {
    return new Promise((_resolve, _reject) =>
    {
      void Storage.keys().then(_resp =>
      {
        if (_resp.keys.includes(_key))
        {
          void Storage.get({ key: _key }).catch(_err => _reject(_err)).then(_val =>
          {
            if (_val)
            {
              _val.value ? _resolve(JSON.parse(_val.value)) : _resolve(null)
            }
          })
        } else
        {
          _reject(['Key dont exists']);
        }
      }).catch(_error =>
      {
        _reject(_error)
      })
    })
  }

  /**
     * Remove item from LocalStorage
     * @param _key string
     */
  static Storage_remove (_key: string): Promise<void>
  {
    return Storage.remove({
      key: _key
    });
  }

  /**
  * Set value on localStorage
  * @param _key string
  * @param _value unkoun
  */
  static Storage_set (_key: string, _value: unknown): Promise<void>
  {
    return Storage.set({
      key: _key,
      value: JSON.stringify(_value)
    })
  }

  /**
   * Show Toast
   * @param _toast ToastShowOptions
   */
  static Toast_show (_toast: ToastShowOptions): Promise<void>
  {
    return Toast.show(_toast)
  }
}