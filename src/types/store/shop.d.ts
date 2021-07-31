import { DBModel, IUserStore, IDictionary, IImage } from 'src/types';
import { IVue } from '../vue_components';

/**
 * @namespace ShopStore
 */
export namespace IShopStore
{
  /**
   * @interface ShopStore.Category
   */
  interface Category extends DBModel
  {
    title: string;
    tag: string;
  }

  type OrderStatus = 'processing' | 'accepted' | 'v-canceled' | 'c-canceled' | 'completed';

  /**
   * @interface ShopStore.Order
   */
  interface Order extends DBModel
  {
    id: number;
    customer: IUserStore.User;
    products: OrderProduct[];
    tax: number;
    shipping_address: string;
    coordinates: IVue.ILatLng;
    total_products: number;
    status: OrderStatus;
    delivery_time?: string;
    request_time?: string;
  }

  interface OrderProduct extends DBModel
  {
    product: Product;
    product_qty: number;
    product_details?: IDictionary<string | number>;
  }

  /**
   * @type ShopStore.ProductStockStatus
   */
  type ProductStockStatus = 'limited' | 'infinity' | 'backorder' | 'sold_out';

  /**
   * @interface ShopStore.ProductAttributes
   */
  interface ProductAttributes
  {
    Color?: string[] | null,
    Relleno?: string[] | null,
    Sabor?: string[] | null,
  }

  /**
   * @interface ShopStore.Product
   */
  interface Product extends DBModel
  {
    owner: IUserStore.User;
    title: string;
    description?: string;
    image: IImage;
    production_price?: number;
    regular_price?: number;
    sell_price: number;
    onsale?: boolean;
    stock_qty: number;
    stock_status?: ProductStockStatus;
    sold: number;
    weight?: number;
    dimensions?: string;
    tax?: number;
    wholesale?: boolean;
    wholesale_min?: number;
    wholesale_price?: number;
    attributes?: ProductAttributes;
    rating_count?: number;
    rating_average: number;
    category: Category;
    tags?: string[];
  }
}