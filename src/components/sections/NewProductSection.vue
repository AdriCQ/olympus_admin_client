<template>
  <section>
    <q-form @submit="submit">
      <q-card>
        <q-card-section>
          <div class="text-h6">Nuevo Producto</div>
        </q-card-section>
        <!-- <q-card-section>
          <q-input v-model="form.title" class="q-mt-xs" type="text" label="Nombre" />
          <q-select v-model="form.category" :options="categories" label="Categoría" />
        </q-card-section>-->
      </q-card>
    </q-form>
  </section>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
import { IShopService } from 'src/types';

@Component
export default class NewProductSection extends Vue {
  form: IShopService.UpdateProductRequest = {
    product_id: 0,
    onsale: undefined,
    sell_price: undefined,
    stock_qty: undefined,
    stock_status: undefined,
    wholesale_min: undefined,
    weight: undefined,
    attributes: undefined,
    tags: undefined,
  };

  get categories() {
    return [
      {
        label: 'Google',
        value: 'goog',
      },
      {
        label: 'Google',
        value: 'goog',
      },
    ];
  }

  submit() {
    console.log('Submit');
  }
}
</script>