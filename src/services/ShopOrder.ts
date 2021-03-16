import axios from 'axios';
import { IServices, IShopService, IShopStore } from 'src/types';

export class ShopOrderService
{
  private static BASE_PATH = '/shop/order';

  /**
   * New order (require authentication)
   * @param _params 
   * @returns store 
   */
  public static store (_params: IShopService.StoreOrderRequest): IServices.ApiResponse<IShopStore.Product>
  {
    return axios.post(this.BASE_PATH, _params);
  }

  /**
   * Gets vendor orders
   * @param _params 
   * @returns orders 
   */
  public static vList (_params: IShopService.ListOrdersRequest): IServices.ApiResponsePaginated<IShopStore.Order[]> 
  {
    return axios.get(this.BASE_PATH + '/v-list', {
      params: _params
    });
  }

  /**
   * Gets onsale orders for clients
   * @param _params 
   * @returns orders 
   */
  public static list (_params: IShopService.ListOrdersRequest): IServices.ApiResponsePaginated<IShopStore.Order[]> 
  {
    return axios.get(this.BASE_PATH + '/c-list', {
      params: _params
    });
  }

  /**
   * Changes order status for vendors
   * @param _params 
   * @returns order status 
   */
  public static changeStatus (_params: IShopService.ChangeOrderStatusRequest): IServices.ApiResponse<IShopStore.Order>
  {
    return axios.post(this.BASE_PATH + '/v-change-status', _params);
  }

  /**
   * Cancel shop order service for customers
   * @param _orderId 
   * @returns IServices.ApiResponse<IShopStore.Product>
   */
  public static cancel (_orderId: number): IServices.ApiResponse<IShopStore.Product>
  {
    return axios.get(this.BASE_PATH + '/c-cancel', {
      params: {
        order_id: _orderId
      }
    })
  }

  /**
   * Counts vendor orders
   * @param [_status] 
   * @returns vendor orders 
   */
  public static countVendorOrders (_status?: IShopStore.OrderStatus): IServices.ApiResponse<number>
  {
    return axios.get(this.BASE_PATH + '/v-count', {
      params: {
        status: _status
      }
    })
  }

  /**
   * Determines whether delete v
   * @param _order_id 
   * @returns delete 
   */
  public static vDelete (_order_id: number): IServices.ApiResponse<null>
  {
    return axios.get(this.BASE_PATH + '/v-delete', {
      params: {
        order_id: _order_id
      }
    })
  }
}