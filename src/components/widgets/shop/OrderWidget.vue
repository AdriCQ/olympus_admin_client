<template>
  <q-card>
    <q-card-section>
      <div class="text-subtitle2">{{ order.customer.name }}</div>
      <div class="text-subtitle2">
        <q-icon name="mdi-phone" />
        {{ order.customer.mobile_phone }}
      </div>
      <div class="text-subtitle2">Pedidos</div>
      <p
        v-for="(productOrder, prodKey) in order.products"
        :key="`product-${prodKey}`"
      >{{ `${productOrder.product_qty} -- ${productOrder.product.title}` }}</p>
      <div class="text-subtitle2">
        <span>Dirección</span>
        <q-btn
          icon="mdi-map-marker-radius"
          class="q-ml-sm"
          label="Mostrar en Mapa"
          @click="$emit('map',{ latLng: order.coordinates, shipping_address: order.shipping_address})"
          size="xs"
        />
      </div>
      <p>{{ order.shipping_address }}</p>
      <div class="text-subtitle2">Fecha</div>
      <p>{{ date }}</p>
    </q-card-section>
    <q-card-actions>
      <q-btn-group push>
        <q-btn
          push
          color="primary"
          size="sm"
          v-if="order.status ==='processing'"
          @click="changeStatus('accepted')"
        >
          <q-icon name="mdi-check" />&nbsp; Aceptar
        </q-btn>
        <q-btn
          push
          color="negative"
          size="sm"
          v-if="order.status ==='processing'"
          @click="changeStatus('v-canceled')"
        >
          <q-icon name="mdi-close" />&nbsp; Cancelar
        </q-btn>
        <q-btn
          push
          color="positive"
          size="sm"
          v-if="order.status === 'accepted'"
          @click="changeStatus('completed')"
        >
          <q-icon name="mdi-check-all" />&nbsp; Completar
        </q-btn>
      </q-btn-group>
    </q-card-actions>
    <inner-loading :loading="loading" />
  </q-card>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';
import { OrderInstance } from 'src/helpers';
import { IShopStore } from 'src/types';
import { ShopOrderStore } from 'src/store/modules';

@Component({
  components: {
    'inner-loading': () => import('src/components/widgets/InnerLoading.vue'),
  },
})
export default class OrderWidget extends Vue {
  @Prop({
    type: Object,
    default: () => {
      return OrderInstance;
    },
  })
  readonly order!: IShopStore.Order;

  loading = false;

  get date() {
    return this.order.updated_at
      ? new Date(this.order.updated_at).toLocaleString()
      : null;
  }

  changeStatus(_status: IShopStore.OrderStatus) {
    this.loading = true;
    void ShopOrderStore.changeOrderStatus({
      order_id: this.order.id,
      status: _status,
    })
      .catch((_err) => console.log(_err))
      .finally(() => {
        this.loading = false;
      });
  }
}
</script>