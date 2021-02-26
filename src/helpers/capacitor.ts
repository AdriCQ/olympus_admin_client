import axios from 'axios';
import { AppRestoredResult, CameraOptions, FilesystemDirectory, NetworkStatus, Plugins, ToastShowOptions } from '@capacitor/core';
import { IDictionary } from 'src/types';
const { App, Camera, Storage, Toast, Filesystem, Network } = Plugins;

/**
 * Capacitor Helper
 */
export class CapacitorHelper
{
  /**
   * Exit App
   */
  static App_exitApp ()
  {
    return App.exitApp()
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

  // FileSystem_updateApplication (_url: string, _params: IDictionary<unknown>)
  // {
  //   return new Promise((_resolve, _reject) =>
  //   {
  //     void axios.get(_url, {
  //       responseType: 'blob',
  //       params: _params
  //     }).then(_axiosResponse =>
  //     {
  //       void Filesystem.writeFile({
  //         path: 'apks/file.apk',
  //         // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  //         data: _axiosResponse.data,
  //         directory: FilesystemDirectory.Documents,
  //       })
  //     })
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
   * Get data from LocalStorage
   * @param _key string
   */
  static Storage_get (_key: string): Promise<string | null>
  {
    return new Promise((_resolve, _reject) =>
    {
      void Storage.keys().then(_resp =>
      {
        const keys = _resp.keys;
        let keyExists = false;
        keys.filter((_fKey) =>
        {
          if (_fKey === _key)
          {
            keyExists = true;
            return;
          }
        })
        if (keyExists)
        {
          void Storage.get({ key: _key }).catch(_err => _reject(_err)).then(_val =>
          {
            _val ? _resolve(_val.value) : _resolve(null);
          })
        } else
        {
          _reject(['Key no exists']);
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
   * Clear LocalStorage
   */
  static Storage_clear (): Promise<void>
  {
    return Storage.clear();
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