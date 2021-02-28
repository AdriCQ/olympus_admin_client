<template>
  <section>
    <q-card>
      <q-card-section>
        <div class="text-h6">Listado de Productos</div>
      </q-card-section>
      <q-card-section>
        <div class="row q-col-gutter-sm">
          <div
            class="col-xs-12 col-sm-4 col-md-3 col-lg-2 col-xl-1"
            v-for="(product, key) in products"
            :key="key"
          >
            <product-widget
              :product="product"
              @update="freshKey++"
              :key="`product-${key}-${freshKey}`"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </section>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';
import { ShopProductStore, AppStore } from 'src/store/modules';

@Component({
  components: {
    'product-widget': () => import('components/widgets/shop/ProductWidget.vue'),
  },
})
export default class ProductListSection extends Vue {
  beforeMount() {
    if (this.preload) {
      this.$q.loadingBar.start();
      ShopProductStore.listByVendorAction({})
        .then((_resp) => {
          ShopProductStore.setProducts(_resp.data);
        })
        .catch((_err) => AppStore.handleErrors(_err))
        .finally(() => {
          this.$q.loadingBar.stop();
        });
    }
  }
  @Prop({ type: Boolean, default: true }) readonly preload!: boolean;

  freshKey = 0;

  get products() {
    return ShopProductStore.products;
  }
}
</script>