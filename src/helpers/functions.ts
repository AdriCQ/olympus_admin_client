import { IImage, IOlympusService } from 'src/types';
import { PALREY_APP_TOKEN, SERVER_URL } from 'src/helpers';
import { ServiceProvider, ShopOrderService, OlympusService } from 'src/services';
import { HapticsNotificationType, Plugins } from '@capacitor/core';
import { AppStore } from 'src/store/modules';
const { LocalNotifications, Haptics } = Plugins;
/**
 * @class Function helper 
 */
export class FunctionHelper
{

  /**
   * Handles image
   * @param _image 
   * @param [_size] 
   * @returns  
   */
  static handleImage (_image: IImage, _size: 'sm' | 'md' | 'lg' = 'md'): string
  {
    const localImages = [
      { id: 1, paths: { sm: 'img/default.jpg', md: 'img/default.jpg', lg: 'img/default.jpg' } },
      { id: 2, paths: { sm: 'img/products/sm_2.jpg', md: 'img/products/md_2.jpg', lg: 'img/products/lg_2.jpg' } },
      { id: 3, paths: { sm: 'img/products/sm_3.jpg', md: 'img/products/md_3.jpg', lg: 'img/products/lg_3.jpg' } },
      { id: 4, paths: { sm: 'img/products/sm_4.jpg', md: 'img/products/md_4.jpg', lg: 'img/products/lg_4.jpg' } },
      { id: 5, paths: { sm: 'img/products/sm_5.jpg', md: 'img/products/md_5.jpg', lg: 'img/products/lg_5.jpg' } },
      { id: 6, paths: { sm: 'img/products/sm_6.jpg', md: 'img/products/md_6.jpg', lg: 'img/products/lg_6.jpg' } },
      { id: 7, paths: { sm: 'img/products/sm_7.jpg', md: 'img/products/md_7.jpg', lg: 'img/products/lg_7.jpg' } },
    ];
    const search = localImages.find(_findImage =>
    {
      return _image.id === _findImage.id;
    })
    return search ? search.paths[_size] : SERVER_URL + String(_image.paths[_size]);
  }

  /**
   * Notifications interval
   */
  static notificationsInterval ()
  {
    // let counter = 0;
    setInterval(() =>
    {
      void ServiceProvider.callableService(ShopOrderService.countVendorOrders('processing'), ((_resp: number) =>
      {
        console.log('Counter', _resp);
        if (Number(_resp) > 0)
        {
          Haptics.vibrate();
          Haptics.notification({
            type: HapticsNotificationType.WARNING
          });
          void LocalNotifications.schedule({
            notifications: [
              {
                title: 'Palrey Notification',
                body: `${_resp} pedidos nuevos`,
                id: 1
              }
            ]
          }).catch((_err) => console.log(_err));
        }
      })).catch(_err => console.log(_err));

      /**
       * Get Daily Visits
       */
      void ServiceProvider.callableService(OlympusService.getAppInfo(PALREY_APP_TOKEN), (_resp: IOlympusService.Application) =>
      {
        AppStore.palrey = _resp;
      }).catch((_err) => console.log('AppInfoError', _err))
    }, 1 * 60 * 1000)
  }
}
