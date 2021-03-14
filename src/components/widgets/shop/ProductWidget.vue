<template>
  <q-card class="cursor-pointer">
    <div class="text-center">
      <img :src="imageSrc" spinner-color="primary" style="width: 100%" />
    </div>
    <q-card-section>
      <!-- <div class="text-subtitle2">{{ product.title }}</div> -->
      <div class="text-subtitle2">{{ product.title }}, ${{ Number(product.sell_price).toFixed(2) }}</div>
      <!-- <p>Vendidos: {{ Number(product.sold) }}</p> -->
      <p>Inventario: {{ String(product.stock_status).toLocaleUpperCase() }}</p>
      <p v-if="product.stock_status === 'limited'">Cantidad: {{ product.stock_qty }}</p>
      <p>
        <q-btn @click="details" size="sm" label="Detalles" />
      </p>
      <p>
        <q-btn
          :color="onSaleButtonSettings.color"
          :icon="onSaleButtonSettings.icon"
          size="sm"
          :label="onSaleButtonSettings.label"
          @click="changeOnsale"
        />
        <q-btn icon="mdi-pencil-box-outline" label="Editar" size="sm" @click="edit" />
      </p>
    </q-card-section>
    <inner-loading :loading="loading" />
  </q-card>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';
import { IShopStore } from 'src/types';
import { FunctionHelper, ProductInstance } from 'src/helpers';
import { ShopProductStore, AppStore } from 'src/store/modules';

@Component({
  components: {
    'inner-loading': () => import('src/components/widgets/InnerLoading.vue'),
  },
})
export default class ProductWidget extends Vue {
  @Prop({
    type: Object,
    default: () => ProductInstance,
  })
  readonly product!: IShopStore.Product;

  loading = false;

  get imageSrc() {
    return FunctionHelper.handleImage(this.product.image, 'sm');
  }

  get onSaleButtonSettings() {
    if (!this.product.onsale) {
      return {
        color: 'positive',
        icon: 'mdi-cart',
        label: 'Vender',
      };
    }
    return {
      color: 'negative',
      icon: 'mdi-cart-off',
      label: 'No Vender',
    };
  }

  changeOnsale() {
    this.loading = true;
    void ShopProductStore.updateAction({
      product_id: this.product.id,
      onsale: !this.product.onsale,
    })
      .then((_product: IShopStore.Product) => {
        ShopProductStore.setProductsById({
          id: this.product.id,
          product: _product,
        });
        this.$emit('update', _product);
      })
      .catch((_err) => AppStore.handleErrors(_err))
      .finally(() => {
        this.loading = false;
      });
  }

  details() {
    void this.$router.push({
      name: 'shop.product.details',
      query: {
        product_id: String(this.product.id),
      },
    });
  }

  edit() {
    void this.$router.push({
      name: 'shop.product.edit',
      query: {
        product_id: String(this.product.id),
      },
    });
  }
}
</script>