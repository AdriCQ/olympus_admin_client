<template>
  <q-page padding>
    <q-card>
      <q-card-section class="px-none">
        <q-tabs v-model="orderStatus" no-caps outside-arrows mobile-arrows dense class="text-teal">
          <q-tab name="processing" icon="mdi-cart-plus" label="Nuevas" />
          <q-tab name="accepted" icon="mdi-cart" label="Aceptadas" />
          <q-tab name="canceled" icon="mdi-cart-off" label="Canceladas" />
          <q-tab name="completed" icon="mdi-cash-multiple" label="Finalizadas" />
        </q-tabs>
      </q-card-section>
      <q-card-section>
        <orders-list-section :order-status="orderStatus" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { IShopStore } from 'src/types';
import { AppMixin } from 'src/mixins';

@Component({
  components: {
    'orders-list-section': () =>
      import('components/sections/OrdersListSection.vue'),
  },
})
export default class PageIndex extends Mixins(AppMixin) {
  orderStatus: IShopStore.OrderStatus = 'processing';
}
</script>
