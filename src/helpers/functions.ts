import { IImage } from 'src/types';
import { SERVER_URL } from 'src/helpers';
import { ServiceProvider, ShopOrderService } from 'src/services';

import { HapticsNotificationType, Plugins } from '@capacitor/core';
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
  static handleImage (_image: IImage, _size: 'sm' | 'md' | 'lg' = 'sm')
  {
    const localImages = [
      { id: 1, paths: { sm: 'img/sm_1.jpg', md: 'img/md_1.jpg', lg: 'img/lg_1.jpg' } },
      { id: 2, paths: { sm: 'img/products/sm_2.jpg', md: 'img/products/md_2.jpg', lg: 'img/products/lg_2.jpg' } },
      { id: 3, paths: { sm: 'img/products/sm_3.jpg', md: 'img/products/md_3.jpg', lg: 'img/products/lg_3.jpg' } },
      { id: 4, paths: { sm: 'img/products/sm_4.jpg', md: 'img/products/md_4.jpg', lg: 'img/products/lg_4.jpg' } },
    ];
    const search = localImages.find(_findImage =>
    {
      return _image.id === _findImage.id;
    })
    return search ? search.paths[_size] : SERVER_URL + _image.paths[_size];
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
    }, 3 * 60 * 1000)
  }
}