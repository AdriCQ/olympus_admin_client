import { IServices, IShopStore, IShopService } from 'src/types';
import axios from 'axios';

export class ShopProductService
{
  private static BASE_PATH = '/shop/product';

  /**
   * Gets by id
   * @param _params 
   * @returns IServices.ApiResponse<IShopStore.Product>
   */
  public static getById (_id: number): IServices.ApiResponse<IShopStore.Product>
  {
    return axios.get(this.BASE_PATH + '/c-by-id', {
      params: {
        product_id: _id
      }
    })
  }

  /**
   * Gets by id (Vendor required)
   * @param _params 
   * @returns IServices.ApiResponse<IShopStore.Product>
   */
  public static getByIdVendor (_id: number): IServices.ApiResponse<IShopStore.Product>
  {
    return axios.get(this.BASE_PATH + '/v-by-id', {
      params: {
        product_id: _id
      }
    })
  }

  /**
   * Filters product service
   * @param _params 
   * @returns IServices.ApiResponsePaginated<IShopStore.Product>
   */
  public static filter (_params: IShopService.FilterProductRequest): IServices.ApiResponsePaginated<IShopStore.Product>
  {
    return axios.get(this.BASE_PATH + '/v-filter', {
      params: _params
    })
  }

  /**
   * Lists vendor
   * @param _params IShopService.ListVendorProductsRequest
   * @returns vendor 
   */
  public static listVendor (_params: IShopService.ListVendorProductsRequest): IServices.ApiResponsePaginated<IShopStore.Product>
  {
    return axios.get(this.BASE_PATH + '/v-list', {
      params: _params
    })
  }

  /**
   * Removes product
   * @param _id 
   * @returns IServices.ApiResponse<boolean>
   */
  public static remove (_id: number): IServices.ApiResponse<boolean>
  {
    return axios.get(this.BASE_PATH + '/v-remove', {
      params: {
        product_id: _id
      }
    })
  }

  /**
   * Updates shop product
   * @param _params 
   * @returns IServices.ApiResponse<IShopStore.Product>
   */
  public static update (_params: IShopService.UpdateProductRequest): IServices.ApiResponse<IShopStore.Product>
  {
    return axios.post(this.BASE_PATH + '/v-update', _params);
  }
}