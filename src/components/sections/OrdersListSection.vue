<template>
  <section>
    <map-popup v-model="mapPopup" :map-options="mapOptions" :address="mapAddress" />
    <q-pull-to-refresh @refresh="refresh" color="white" bg-color="primary">
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ sectionTitle }}</div>
        </q-card-section>
        <q-card-section>
          <div class="row q-col-gutter-sm">
            <div
              class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2"
              v-for="(order, orderKey) in orders"
              :key="`order-${orderKey}`"
            >
              <order-widget :order="order" :key="`${orderKey}`" @map="showMap" />
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn
            icon="mdi-skip-previous"
            :disable="!Boolean(prevPage)"
            @click="loadData({status:orderStatus, page:prevPage})"
          />
          <q-btn
            icon="mdi-skip-next"
            :disable="!Boolean(nextPage)"
            @click="loadData({status:orderStatus, page:nextPage})"
          />
        </q-card-actions>
      </q-card>
    </q-pull-to-refresh>
  </section>
</template>

<script lang='ts'>
import { Component, Prop, Watch, Mixins } from 'vue-property-decorator';
import { AppStore, ShopOrderStore } from 'src/store/modules';
import { IShopStore, IShopService, IVue } from 'src/types';
import { AppMixin } from 'src/mixins';

@Component({
  components: {
    'map-popup': () => import('components/popups/MapPopup.vue'),
    'order-widget': () => import('components/widgets/shop/OrderWidget.vue'),
  },
})
export default class OrdersListSection extends Mixins(AppMixin) {
  created() {
    this.loadData({
      status: 'processing',
    });
  }
  mapPopup = false;
  mapOptions: IVue.IMapOptions = {};
  mapAddress = '';

  @Prop({ type: String, default: 'processing' })
  readonly orderStatus!: IShopStore.OrderStatus;

  @Watch('orderStatus')
  onOrderStatusChange(_value: IShopStore.OrderStatus) {
    this.loadData({
      status: _value,
    });
  }

  get orders() {
    return ShopOrderStore.orders;
  }

  get nextPage() {
    return ShopOrderStore.orderNextPaginationPage;
  }
  get prevPage() {
    return ShopOrderStore.orderPrevPaginationPage;
  }

  get sectionTitle() {
    switch (this.orderStatus) {
      case 'processing':
        return 'Nuevas Órdenes';
      case 'accepted':
        return 'Órdenes Aceptadas';
      case 'v-canceled':
        return 'Órdenes Canceladas';
      case 'c-canceled':
        return 'Órdenes Canceladas por Clientes';
      case 'completed':
        return 'Órdenes Completadas';
    }
  }

  loadData(_params: IShopService.ListOrdersRequest) {
    this.scrollTop();
    // ShopOrderStore.setOrders([]);
    void ShopOrderStore.listOrders(_params)
      .then((_resp) => {
        ShopOrderStore.setOrders(_resp.data);
      })
      .catch((error) => {
        AppStore.handleErrors(error);
      });
  }

  showMap(_c: { latLng: IVue.ILatLng; shipping_address: string }) {
    this.mapOptions = {
      center: {
        lat: _c.latLng.lat,
        lng: _c.latLng.lng,
      },
      zoom: 16,
      marker: {
        lat: _c.latLng.lat,
        lng: _c.latLng.lng,
      },
      noEdit: true,
    };
    this.mapAddress = _c.shipping_address;
    this.mapPopup = true;
  }

  refresh(done: CallableFunction) {
    this.scrollTop();
    // ShopOrderStore.setOrders([]);
    void ShopOrderStore.listOrders({ status: this.orderStatus })
      .then((_resp) => {
        ShopOrderStore.setOrders(_resp.data);
      })
      .catch((error) => {
        AppStore.handleErrors(error);
      })
      .finally(() => {
        done();
      });
  }
}
</script>