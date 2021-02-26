<template>
  <section class="q-mt-lg">
    <q-form @submit.prevent="search" class="q-gutter-md">
      <q-card>
        <q-card-section class="text-center">
          <q-btn color="primary" type="submit" icon="mdi-magnify" label="Buscar" />
        </q-card-section>
        <q-card-section>
          <q-input v-model="form.title" class="q-mt-xs" type="text" label="Nombre" />
          <q-input v-model="form.min_price" class="q-mt-xs" type="number" label="Precio Mínimo" />
          <q-input v-model="form.max_price" class="q-mt-xs" type="number" label="Precio Máximo" />
          <q-input v-model="form.sell_price" class="q-mt-xs" type="number" label="Precio" />
          <template v-if="form.wholesale">
            <q-input
              v-model="form.wholesale_min"
              class="q-mt-xs"
              type="number"
              label="Minima Mayorista"
            />
            <q-input
              v-model="form.wholesale_price"
              class="q-mt-xs"
              type="number"
              label="Precio Mayorista"
            />
          </template>
        </q-card-section>
      </q-card>
    </q-form>
  </section>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
import { IShopService } from 'src/types';
import { ShopProductStore, AppStore } from 'src/store/modules';

@Component
export default class ProductSearchSection extends Vue {
  form: IShopService.FilterProductRequest = {
    title: undefined,
    max_price: undefined,
    min_price: undefined,
    sell_price: undefined,
    stock_qty: undefined,
    stock_status: undefined,
    wholesale: undefined,
    wholesale_min: undefined,
    wholesale_price: undefined,
    tags: undefined,
    category: undefined,
  };

  search() {
    this.$q.loading.show();
    ShopProductStore.filterAction(this.form)
      .then(() => {
        // console.log(_resp.data);
        this.$emit('changeComponent', {
          component: 'product-list-section',
          props: { preload: false },
        });
      })
      .catch((_err) => AppStore.handleErrors(_err))
      .finally(() => {
        this.$q.loading.hide();
      });
  }
}
</script>