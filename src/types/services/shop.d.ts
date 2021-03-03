import { IShopStore, IDictionary } from 'src/types';
/**
 * @namespace IShopService
 */
export namespace IShopService
{
  /**
   * -----------------------------------------
   *	Orders
   * -----------------------------------------
   */

  /**
   * Store order request
   */
  interface StoreOrderRequest
  {
    products: OrderProduct[];
    shipping_address: string;
    coordinates: { lat: number; lng: number };
    message?: string;
  }

  /**
   * Order product request
   */
  interface OrderProduct
  {
    id: number;
    qty: number;
  }

  /**
   * List Orders Request
   * @interface IShopService.ListOrdersRequest
   */
  interface ListOrdersRequest
  {
    status?: IShopStore.OrderStatus;
    page?: number;
  }

  /**
   * Change Order Status request
   * @interface IShopService.ChangeOrderStatusRequest
   */
  interface ChangeOrderStatusRequest
  {
    order_id: number;
    status: IShopStore.OrderStatus;
  }

  /**
   * -----------------------------------------
   *	Products
   * -----------------------------------------
   */

  /**
   * Filter product request
   */
  interface FilterProductRequest
  {
    title?: string;
    max_price?: number;
    min_price?: number;
    sell_price?: number;
    stock_qty?: number;
    stock_status?: IShopStore.ProductStockStatus;
    wholesale?: boolean;
    wholesale_min?: number;
    wholesale_price?: number;
    tags?: string[],
    category?: string;
  }

  /**
   * List vendor products request
   */
  interface ListVendorProductsRequest
  {
    onsale?: boolean;
    orderBy?: 'updated_at' | 'rating' | 'sold';
  }

  /**
   * Update product request
   */
  interface UpdateProductRequest
  {
    product_id: number;
    title?: string;
    description?: string;
    onsale?: boolean;
    production_price?: number;
    sell_price?: number;
    stock_qty?: number;
    stock_status?: IShopStore.ProductStockStatus;
    wholesale_min?: number;
    weight?: number;
    tags?: string[];
    attributes?: IDictionary<string | number>
  }
}