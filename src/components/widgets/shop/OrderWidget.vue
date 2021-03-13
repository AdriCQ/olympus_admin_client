<template>
  <q-card>
    <!-- Dialog -->
    <q-dialog v-model="showTimeDialog">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Hora de Entrega</div>
          <q-space />
          <q-btn icon="mdi-close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <div class="text-subtitle text-center">{{ vDate.formatDate(deliveryTime, 'hh:mm:ss') }}</div>

          <q-btn-group class="q-mt-md" push>
            <q-btn label="+15" @click="addToDeliveryTime(15)" />
            <q-btn label="+30" @click="addToDeliveryTime(30)" />
            <q-btn label="+60" @click="addToDeliveryTime(60)" />
            <q-btn icon="mdi-calendar" @click="showTimeInput = !showTimeInput" />
          </q-btn-group>
          <div class="q-mt-sm" v-if="showTimeInput">
            <p class="q-mb-sm">Tiempo Personalizado</p>
            <q-input
              type="number"
              dense
              value="0"
              outlined
              suffix="minutos"
              min="0"
              @input="onInputTime"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-clock" />
              </template>
            </q-input>
          </div>
        </q-card-section>
        <q-card-actions>
          <q-btn color="positive" size="sm" @click="changeStatus('accepted')" label="Aceptar" />
          <q-btn color="negative" size="sm" @click="closeTimeDialog" label="Cancelar" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- / Dialog -->
    <q-card-section>
      <div class="text-subtitle2">{{ order.customer.name }}</div>
      <div class="text-subtitle2">
        <q-icon name="mdi-phone" />
        {{ order.customer.mobile_phone }}
      </div>
      <div class="text-subtitle2">Pedidos</div>
      <ul>
        <li v-for="(productOrder, prodKey) in order.products" :key="`product-${prodKey}`">
          {{ `${productOrder.product_qty} -- ${productOrder.product.title}` }}
          <ul v-if="productOrder.product_details">
            <li
              v-for="(attr, attrKey) in JSON.parse(productOrder.product_details)"
              :key="attrKey"
            >{{ `${attrKey}: ${attr}` }}</li>
          </ul>
        </li>
      </ul>
      <div class="text-subtitle2">
        <span>Dirección</span>
        <q-btn
          v-if="order.coordinates"
          icon="mdi-map-marker-radius"
          class="q-ml-sm"
          label="Mostrar en Mapa"
          @click="$emit('map',{ latLng: order.coordinates, shipping_address: order.shipping_address})"
          size="xs"
        />
      </div>
      <p>{{ order.shipping_address }}</p>
      <template v-if="order.message">
        <div class="text-subtitle2">Mensaje</div>
        <p>{{ order.message }}</p>
      </template>
      <template v-if="order.status !== 'accepted'">
        <div class="text-subtitle2">Fecha</div>
        <p>{{ updated_at }}</p>
      </template>
      <template v-else>
        <div class="text-subtitle2">Tiempo de entrega</div>
        <p>{{ vDate.getDateDiff(order.delivery_time, new Date(), 'minutes') }} minutos</p>
      </template>
    </q-card-section>
    <q-card-actions>
      <q-btn-group push>
        <q-btn
          push
          color="positive"
          size="sm"
          v-if="order.status ==='processing'"
          @click="openAcceptedModal"
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
          color="info"
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
import { date } from 'quasar';

@Component({
  components: {
    'inner-loading': () => import('src/components/widgets/InnerLoading.vue'),
  },
})
export default class OrderWidget extends Vue {
  created() {
    console.log(this.order);
  }
  @Prop({
    type: Object,
    default: () => {
      return OrderInstance;
    },
  })
  readonly order!: IShopStore.Order;

  loading = false;
  showTimeDialog = false;
  showTimeInput = false;
  deliveryTime: Date | null = null;

  get vDate() {
    return date;
  }

  get updated_at() {
    return this.order.updated_at
      ? new Date(this.order.updated_at).toLocaleString()
      : null;
  }

  changeStatus(_status: IShopStore.OrderStatus) {
    this.showTimeDialog = false;
    this.loading = true;
    console.log('Before sent', this.deliveryTime);
    void ShopOrderStore.changeOrderStatus({
      order_id: this.order.id,
      status: _status,
      delivery_time: this.deliveryTime,
    })
      // .then((_resp) => console.log(_resp))
      .catch((_err) => console.log(_err))
      .finally(() => {
        this.loading = false;
      });
  }

  openAcceptedModal() {
    this.showTimeDialog = true;
    this.showTimeInput = false;
    this.deliveryTime = new Date();
  }

  closeTimeDialog() {
    this.showTimeDialog = false;
    this.deliveryTime = null;
  }

  addToDeliveryTime(_minutes = 60) {
    this.deliveryTime = date.addToDate(new Date(), {
      minutes: _minutes,
    });
    console.log(this.deliveryTime);
  }

  onInputTime(_input: number) {
    this.addToDeliveryTime(_input);
  }
}
</script>