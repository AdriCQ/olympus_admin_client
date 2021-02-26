import { VuexModule, Module, Action, Mutation } from 'vuex-class-modules';
import { storeInstance } from 'src/store';
import { IShopStore, IShopService, IServices } from 'src/types';
import { ProductInstance } from 'src/helpers';
import { ServiceProvider, ShopProductService } from 'src/services';

interface ISetProductsByIdParams
{
  id: number;
  product: IShopStore.Product;
}

@Module({ generateMutationSetters: true })
class ShopProductModule extends VuexModule
{
  product: IShopStore.Product = ProductInstance;
  products: IShopStore.Product[] = [];
  nextPaginationPage: null | number = null;
  prevPaginationPage: null | number = null;

  @Mutation
  setProducts (_p: IShopStore.Product[])
  {
    this.products = _p
  }

  @Mutation
  setProduct (_p: IShopStore.Product)
  {
    this.product = _p
  }

  @Mutation
  setProductsById (_params: ISetProductsByIdParams)
  {
    const index = this.products.findIndex((p =>
    {
      return p.id === _params.id;
    }));
    this.products[index] = _params.product;
  }

  /**
   * Actions get shop product by id
   * @param _id 
   * @returns Promise<IShopStore.Product>
   */
  @Action
  getByIdAction (_id: number): Promise<IShopStore.Product>
  {
    return new Promise((_resolve, _reject) =>
    {
      void ServiceProvider.callableService(ShopProductService.getByIdVendor(_id), (_resp: IShopStore.Product) =>
      {
        _resolve(_resp);
      }).catch(_error => _reject(_error));

    });
  }

  /**
   * Actions filter shop product module
   * @param _params 
   * @returns Promise<IServices.PaginatedData<IShopStore.Product[]>>
   */
  @Action
  filterAction (_params: IShopService.FilterProductRequest): Promise<IServices.PaginatedData<IShopStore.Product[]>>
  {
    return new Promise((_resolve, _reject) =>
    {
      void ServiceProvider.callableService(ShopProductService.filter(_params), (_resp: IServices.PaginatedData<IShopStore.Product[]>) =>
      {
        _resp.next_page_url ? this.nextPaginationPage = _resp.current_page + 1 : this.nextPaginationPage = null;
        _resp.prev_page_url ? this.prevPaginationPage = _resp.current_page - 1 : this.prevPaginationPage = null;
        _resolve(_resp);
      }).catch(_errors => _reject(_errors))
    })
  }

  /**
   * Actions shop product module
   * @param _params ShopService.ListVendorProductsRequest
   * @returns Promise<IServices.PaginatedData<IShopStore.Product[]>>
   */
  @Action
  listByVendorAction (_params: IShopService.ListVendorProductsRequest): Promise<IServices.PaginatedData<IShopStore.Product[]>>
  {
    return new Promise((_resolve, _reject) =>
    {
      void ServiceProvider.callableService(ShopProductService.listVendor(_params),
        (_resp: IServices.PaginatedData<IShopStore.Product[]>) =>
        {
          _resp.next_page_url ? this.nextPaginationPage = _resp.current_page + 1 : this.nextPaginationPage = null;
          _resp.prev_page_url ? this.prevPaginationPage = _resp.current_page - 1 : this.prevPaginationPage = null;
          _resolve(_resp);
        }
      ).catch(_err => _reject(_err));
    })
  }

  /**
   * Actions update product
   * @param _params IShopService.UpdateProductRequest
   * @returns Promise<IShopStore.Product>
   */
  @Action
  updateAction (_params: IShopService.UpdateProductRequest): Promise<IShopStore.Product>
  {
    return new Promise((_resolve, _reject) =>
    {
      void ServiceProvider.callableService(ShopProductService.update(_params), (_resp: IShopStore.Product) =>
      {
        _resolve(_resp);
      }).catch(_err => _reject(_err));
    })
  }
}
// register module (could be in any file)
export const ShopProductStore = new ShopProductModule({ store: storeInstance, name: 'ShopProduct' });