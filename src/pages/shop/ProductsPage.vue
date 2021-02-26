<template>
  <q-page padding>
    <section>
      <q-card>
        <q-card-section>
          <div class="text-h6">Productos</div>
        </q-card-section>
        <q-card-section class="px-none">
          <q-tabs
            v-model="activeAction"
            no-caps
            outside-arrows
            mobile-arrows
            dense
            class="text-teal"
          >
            <q-tab name="new-product-section" icon="mdi-cart-plus" label="Nuevo" />
            <q-tab name="product-list-section" icon="mdi-format-list-bulleted" label="Listado" />
            <q-tab name="product-search-section" icon="mdi-magnify" label="Buscar" />
          </q-tabs>
        </q-card-section>
      </q-card>
    </section>
    <div class="q-mt-sm">
      <component :is="activeAction" @changeComponent="changeComponent" v-bind="props" />
    </div>
  </q-page>
</template>

<script lang='ts'>
import { Component, Mixins } from 'vue-property-decorator';
import { AppMixin } from 'src/mixins';

interface IChangeComponent {
  component: string;
  props?: {
    preload?: boolean;
  };
}
@Component({
  components: {
    'new-product-section': () =>
      import('components/sections/NewProductSection.vue'),
    'product-list-section': () =>
      import('components/sections/ProductListSection.vue'),
    'product-search-section': () =>
      import('components/sections/ProductSearchSection.vue'),
  },
})
export default class ProductsPage extends Mixins(AppMixin) {
  activeAction = 'product-list-section';
  props = {};

  changeComponent(_d: IChangeComponent) {
    this.activeAction = _d.component;
    _d.props ? (this.props = _d.props) : (this.props = {});
  }
}
</script>