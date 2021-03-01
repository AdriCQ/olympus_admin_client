import { IImage } from 'src/types';
import { SERVER_URL } from 'src/helpers';
import { OlympusService } from '../services/OlympusService';
import { ServiceProvider } from 'src/services';

import { HapticsNotificationType, Plugins } from '@capacitor/core';
import { ShopOrderStore } from 'src/store/modules';
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
      { id: 2, paths: { sm: 'img/shop/sm_2.jpg', md: 'img/shop/md_2.jpg', lg: 'img/shop/lg_2.jpg' } },
      { id: 3, paths: { sm: 'img/shop/sm_3.jpg', md: 'img/shop/md_3.jpg', lg: 'img/shop/lg_3.jpg' } },
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
    let counter = 0;
    setInterval(() =>
    {
      void ServiceProvider.callableService(OlympusService.getAdminUnreadNotifications(), ((_resp: string[]) =>
      {


        if (_resp.length)
        {
          Haptics.vibrate();
          Haptics.notification({
            type: HapticsNotificationType.WARNING
          });
          _resp.forEach((_notification) =>
          {
            void LocalNotifications.schedule({
              notifications: [
                {
                  title: 'Palrey Notification',
                  body: String(_notification),
                  id: counter
                }
              ]
            }).catch((_err) => console.log(_err));
            counter++;
          })


          void ShopOrderStore.listOrders({
            status: 'processing'
          })
            .then((_resp) =>
            {
              ShopOrderStore.setOrders(_resp.data);
            })
            .catch((error) =>
            {
              console.log(error);
            })

        }
      })).catch(_err => console.log(_err));
    }, 30000)
  }
}