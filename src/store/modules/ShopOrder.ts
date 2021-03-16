import { VuexModule, Module, Action, Mutation } from 'vuex-class-modules';
import { storeInstance } from 'src/store';
import { ServiceProvider, ShopOrderService } from 'src/services';
import { IServices, IShopStore, IShopService } from 'src/types';
import { OrderInstance } from 'src/helpers';

@Module({ generateMutationSetters: true })
class ShopOrderModule extends VuexModule
{
  order: IShopStore.Order = OrderInstance;
  orders: IShopStore.Order[] = [];
  orderNextPaginationPage: null | number = null;
  orderPrevPaginationPage: null | number = null;

  @Mutation
  setOrder (_o: IShopStore.Order)
  {
    this.order = _o;
  }

  @Mutation
  setOrders (_o: IShopStore.Order[])
  {
    this.orders = _o;
  }

  @Mutation
  removeOrderIndex (index: number)
  {
    this.orders.splice(index, 1);
  }

  @Action
  listOrders (_params: IShopService.ListOrdersRequest): Promise<IServices.PaginatedData<IShopStore.Order[]>>
  {
    return new Promise((_resolve, _reject) =>
    {
      void ServiceProvider.callableService(
        ShopOrderService.vList(_params),
        ((_resp: IServices.PaginatedData<IShopStore.Order[]>) =>
        {
          _resp.next_page_url ? this.orderNextPaginationPage = _resp.current_page + 1 : this.orderNextPaginationPage = null;
          _resp.prev_page_url ? this.orderPrevPaginationPage = _resp.current_page - 1 : this.orderPrevPaginationPage = null;
          // console.log('Orders Storage', _resp);
          _resolve(_resp);
        })
      ).catch(_error => _reject(_error))
    })
  }

  @Action
  changeOrderStatus (_params: IShopService.ChangeOrderStatusRequest): Promise<IShopStore.Order>
  {
    return new Promise((_resolve, _reject) =>
    {
      void ServiceProvider.callableService(
        ShopOrderService.changeStatus(_params),
        (_response: IShopStore.Order) =>
        {
          const indexOrder = this.orders.findIndex((_order) =>
          {
            return _order.id === _response.id;
          })
          this.removeOrderIndex(indexOrder);
          _resolve(_response);
        }
      ).catch((error) =>
      {
        _reject(error);
      });
    })
  }

  /**
   * Actions shop order module
   * @param _order_id 
   * @returns action 
   */
  @Action
  deleteAction (_order_id: number): Promise<boolean>
  {
    return new Promise((_resolve, _reject) =>
    {
      void ServiceProvider.callableService(ShopOrderService.vDelete(_order_id), () =>
      {
        const indexOrder = this.orders.findIndex((_order) =>
        {
          return _order.id === _order_id;
        })
        this.removeOrderIndex(indexOrder);
        _resolve(true);
      }).catch(_err => _reject(_err))
    })
  }
}
// register module (could be in any file)
export const ShopOrderStore = new ShopOrderModule({ store: storeInstance, name: 'Shop' });