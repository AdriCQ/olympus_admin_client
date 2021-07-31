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

  get created_at() {
    return this.order.created_at
      ? new Date(this.order.created_at).toLocaleString()
      : null;
  }
  get delivery_time() {
    if (this.order.delivery_time) {
      const deliveryTime = new Date(this.order.delivery_time);
      const diffHours = date.getDateDiff(deliveryTime, new Date(), 'hours');
      const diffDays = date.getDateDiff(deliveryTime, new Date(), 'days');
      const diffMinutes = date.getDateDiff(deliveryTime, new Date(), 'minutes');
      if (diffMinutes < 0) {
        if (diffHours < -24) {
          return `Hace ${diffDays * -1} ${diffDays < -1 ? 'días' : 'día'}, ${
            (diffHours * -1) % 24
          }h y ${(diffMinutes * -1) % 60}min`;
        } else if (diffHours < -1) {
          return `Hace ${diffHours * -1}h y ${(diffMinutes * -1) % 60}min`;
        } else {
          return `Hace ${diffMinutes * -1}min`;
        }
      }
      if (diffHours > 24) {
        return `${diffDays} ${diffDays > 1 ? 'días' : 'día'}, ${
          diffHours % 24
        }h y ${diffMinutes % 60}min`;
      } else if (diffHours > 0) {
        return `${diffHours}h y ${diffMinutes % 60}min`;
      } else {
        return `${diffMinutes}min`;
      }
    }
    return false;
  }

  get request_time() {
    return this.order.request_time
      ? new Date(this.order.request_time).toLocaleString()
      : null;
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