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
          <div
            class="text-subtitle text-center"
          >{{ vDate.formatDate(deliveryTime, 'YYYY/MM/DD hh:mm a') }}</div>

          <q-btn-group class="q-mt-md" push>
            <q-btn label="+15" @click="addToDeliveryTime(15)" />
            <q-btn label="+30" @click="addToDeliveryTime(30)" />
            <q-btn label="+60" @click="addToDeliveryTime(60)" />
            <q-btn icon="mdi-calendar" @click="showTimeInput = !showTimeInput" />
          </q-btn-group>
          <div v-if="request_time">
            Solicitud:
            <q-chip
              icon="mdi-calendar"
              clickable
              @click="setDeliveryTime(request_time)"
              :label="request_time"
            />
          </div>
          <div class="q-mt-sm" v-if="showTimeInput">
            <p class="q-mb-sm">Tiempo Personalizado</p>
            <q-input type="number" dense value="0" outlined min="0" @input="onInputTime">
              <template v-slot:prepend>
                <q-icon name="mdi-clock" />
              </template>
              <template v-slot:append>
                <q-chip
                  style="width:5rem; text-align:center"
                  class="glossy"
                  clickable
                  @click="toggleMetric"
                  :label="timeMetric"
                />
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
      <div class="absolute-top-right">
        <q-btn
          icon="mdi-delete"
          color="negative"
          padding="xs"
          unelevated
          style="z-index: 10"
          @click="deleteOrder"
        />
      </div>
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
              v-for="(attr, attrKey) in productOrder.product_details"
              :key="attrKey"
            >{{ `${attrKey}: ${attr}` }}</li>
          </ul>
        </li>
      </ul>
      <div
        class="text-subtitle2"
        v-if="Number(order.tax) > 0"
      >Precio Extra: ${{ Number(order.tax).toFixed(2) }}</div>
      <div
        class="text-subtitle2"
      >Precio Total: ${{ Number(order.total_price + order.tax).toFixed(2) }}</div>

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
        <!-- Messages -->
        <div class="q-px-sm row justify-center">
          <div style="width: 100%">
            <q-chat-message size="10" :text="[order.message]" />
          </div>
        </div>
        <!-- / Messages -->
      </template>
      <template v-if="request_time">
        <div class="text-subtitle2">Lo quiero para:</div>
        <p>{{ request_time }}</p>
      </template>
      <template v-if="order.status !== 'accepted'">
        <div class="text-subtitle2">Creado:</div>
        <p>{{ created_at }}</p>
      </template>
      <template v-else>
        <div class="text-subtitle2">Tiempo de entrega</div>
        <p>{{ delivery_time }}</p>
      </template>
    </q-card-section>
    <q-card-actions>
      <q-btn-group push>
        <q-btn push color="positive" size="sm" @click="openAcceptedModal">
          <q-icon name="mdi-check" />&nbsp; Aceptar
        </q-btn>
        <q-btn push color="negative" size="sm" @click="changeStatus('v-canceled')">
          <q-icon name="mdi-close" />&nbsp; Cancelar
        </q-btn>
        <q-btn push color="info" size="sm" @click="changeStatus('completed')">
          <q-icon name="mdi-check-all" />&nbsp; Completar
        </q-btn>
      </q-btn-group>
    </q-card-actions>
    <inner-loading :loading="loading" />
  </q-card>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';
import { FunctionHelper, OrderInstance } from 'src/helpers';
import { IShopStore } from 'src/types';
import { ShopOrderStore } from 'src/store/modules';
import { date } from 'quasar';

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
  showTimeDialog = false;
  showTimeInput = false;
  deliveryTime: Date | null = null;
  timeMetric: 'days' | 'hours' | 'minutes' = 'minutes';

  get created_at() {
    return this.order.created_at
      ? new Date(this.order.created_at).toLocaleString()
      : null;
  }
  get delivery_time() {
    if (this.order.delivery_time) {
      const deliveryTime = new Date(this.order.delivery_time);
      const diffMinutes = date.getDateDiff(deliveryTime, new Date(), 'minutes');
      return FunctionHelper.getTimeString(diffMinutes);
    }
    return false;
  }

  get request_time() {
    if (this.order?.request_time)
      return date.formatDate(this.order.request_time, 'YYYY/MM/DD hh:mm a');
    return null;
  }

  get statusName() {
    return {
      processing: 'En Proceso',
      accepted: 'Aceptado',
      'v-canceled': 'Cancelado por PalRey',
      'c-canceled': 'Cancelado por el Cliente',
      completed: 'Completado',
    };
  }

  get vDate() {
    return date;
  }

  changeStatus(_status: IShopStore.OrderStatus) {
    this.showTimeDialog = false;
    console.log('Before sent', this.deliveryTime);
    this.$q
      .dialog({
        title: 'Confirma',
        message: `Va a cambiar el estado a ${this.statusName[_status]}`,
        cancel: true,
        persistent: false,
      })
      .onOk(() => {
        this.loading = true;
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
      });
  }

  /**
   * Delete Order
   */
  deleteOrder() {
    this.$q
      .dialog({
        title: 'Confirma',
        message: 'Va a ELIMINAR el pedido',
        cancel: true,
        persistent: false,
      })
      .onOk(() => {
        this.loading = true;
        void ShopOrderStore.deleteAction(this.order.id)
          .catch((_err) => console.log(_err))
          .finally(() => {
            this.loading = false;
          });
      });
  }

  openAcceptedModal() {
    this.showTimeDialog = true;
    this.showTimeInput = false;
    this.deliveryTime = new Date();
  }

  setDeliveryTime(_t: string) {
    if (date.isValid(_t)) this.deliveryTime = new Date(_t);
    console.log('DeliveryTIme', this.deliveryTime);
  }

  toggleMetric() {
    if (this.timeMetric === 'days') this.timeMetric = 'minutes';
    else if (this.timeMetric === 'minutes') this.timeMetric = 'hours';
    else this.timeMetric = 'days';
  }

  closeTimeDialog() {
    this.showTimeDialog = false;
    this.deliveryTime = null;
  }

  addToDeliveryTime(_time = 60) {
    this.deliveryTime = date.addToDate(new Date(), {
      [this.timeMetric]: _time,
    });
    console.log(this.deliveryTime);
  }

  onInputTime(_input: number) {
    this.addToDeliveryTime(_input);
  }
}
</script>
