<template>
  <q-page padding>
    <section>
      <q-card>
        <q-card-section>
          <div class="text-h6">User Services</div>
        </q-card-section>
        <q-card-section>
          <q-btn-group>
            <q-btn size="sm" label="Login" @click="login" />
            <q-btn size="sm" label="Sudo Login" @click="sudoLogin" />
            <q-btn size="sm" label="Register" disable />
          </q-btn-group>
        </q-card-section>

        <q-card-section>
          <div class="text-h6">Orders Services</div>
        </q-card-section>
        <q-card-section>
          <q-btn-group>
            <q-btn size="sm" label="New" @click="newOrder" />
            <q-btn size="sm" label="Cutomer List" @click="listClientOrders" />
            <q-btn size="sm" label="Vendor List" @click="listVendorOrders" />
            <q-btn size="sm" label="Customer Cancel" @click="cancelOrder" />
            <q-btn size="sm" label="Change Status" @click="changeOrderStatus" />
          </q-btn-group>
        </q-card-section>
      </q-card>
    </section>
  </q-page>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
import { IShopService, IUserService, IServices } from 'src/types';
import { ServiceProvider, ShopOrderService, UserService } from 'src/services';

@Component
export default class TestServicesPage extends Vue {
  /**
   * User Services
   */
  userLoginParam: IUserService.LoginRequest = {
    mobile_phone: '53375180',
    password: 'password',
  };

  login() {
    this._callService('Login', UserService.login(this.userLoginParam));
  }

  sudoLogin() {
    this._callService('Sudo Login', UserService.login(this.userLoginParam));
  }
  /**
   * Product Services
   */

  /**
   * Order Services
   */
  listOrdersParam: IShopService.ListOrdersRequest = {
    status: 'processing',
    page: 1,
  };

  listClientOrders() {
    this._callService(
      'List Customers Orders',
      ShopOrderService.list(this.listOrdersParam)
    );
  }

  listVendorOrders() {
    this._callService(
      'List Vendors Orders',
      ShopOrderService.listVendor(this.listOrdersParam)
    );
  }

  storeOrderRequest: IShopService.StoreOrderRequest = {
    products: [],
    shipping_address: '',
    message: '',
  };

  newOrder() {
    this._callService(
      'New Order',
      ShopOrderService.store(this.storeOrderRequest)
    );
  }

  cancelOrder() {
    this._callService('Cancel Order', ShopOrderService.cancel(1));
  }

  changeOrderStatus() {
    this._callService(
      'Change Order Status',
      ShopOrderService.changeStatus({
        order_id: 1,
        status: 'accepted',
      })
    );
  }

  _callService(_name = '', _service: IServices.ApiResponse<unknown>) {
    console.log(`"Testing ${_name}`);
    this.$q.loading.show();
    ServiceProvider.callableService(_service, (_resp: unknown) => {
      console.log(`"Testing ${_name} OK!!!`, _resp);
    })
      .catch((_err) => console.log(`Testing ${_name} Error`, _err))
      .finally(() => this.$q.loading.hide());
  }
}
</script>