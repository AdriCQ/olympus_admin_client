<template>
  <q-page padding>
    <q-card v-if="product">
      <div class="text-center">
        <img :src="imageSrc" spinner-color="primary" style="width: 100%" />
      </div>
      <q-card-section>
        <div class="text-h6">{{ product.title }}</div>
        <q-rating :value="product.rating_average" size="2em" icon="mdi-star" />
        <div class="text-subtitle2">${{ Number(product.sell_price).toFixed(2) }}</div>
      </q-card-section>
      <q-card-section>
        <div class="text-subtitle2">Descripción</div>
        {{ product.description }}
      </q-card-section>
      <q-card-section>
        <p>
          <b>Ventas:</b>
          &nbsp;{{ product.sold }}
        </p>
        <p>
          <b>Inventario ({{ String(product.stock_status).toUpperCase() }}):</b>
          &nbsp;{{ product.stock_qty }}
        </p>
        <p>
          <b>Mayorista:</b> &nbsp;
          <q-icon name="mdi-check" color="green" v-if="product.wholesale" />
          <q-icon name="mdi-cancel" color="red" v-else />
        </p>
        <template v-if="product.wholesale">
          <p>
            <b>Precio Mayorista:</b>
            &nbsp;{{ Number(product.wholesale_price).toFixed(2) }}
          </p>
          <p>
            <b>Venta Mínima:</b>
            &nbsp;{{ Number(product.wholesale_min) }}
          </p>
        </template>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang='ts'>
import { ShopProductStore, AppStore } from 'src/store/modules';
import { Component, Mixins } from 'vue-property-decorator';
import { FunctionHelper } from 'src/helpers';
import { AppMixin } from 'src/mixins';
import { IImage, IShopStore } from 'src/types';

@Component
export default class ProductDetailsPage extends Mixins(AppMixin) {
  beforeMount() {
    this.$q.loadingBar.start();
    if (this.productId) {
      ShopProductStore.getByIdAction(Number(this.productId))
        .then((_resp) => {
          this.product = _resp;
        })
        .catch((_err) => AppStore.handleErrors(_err))
        .finally(() => this.$q.loadingBar.stop());
    }
    this.scrollTop();
  }

  product: IShopStore.Product | null = null;

  get productId() {
    return this.$route.query.product_id;
  }
  get imageSrc() {
    return FunctionHelper.handleImage(this.product?.image as IImage, 'lg');
  }
}
</script>