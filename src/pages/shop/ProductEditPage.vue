<template>
  <q-page padding>
    <section>
      <q-form v-if="product" @submit.prevent="submit">
        <q-card>
          <q-card-section>
            <div class="text-h6">Editar Producto</div>
            <div class="text-subtitle2">{{ userName }}</div>
          </q-card-section>
          <q-card-section>
            <div class="text-center" @click="openUploadImagePopup">
              <q-img :src="imageSrc" spinner-color="primary" style="width: 100%" />
            </div>
            <q-input v-model="product.title" type="text" label="Tíitulo" />

            <q-input v-model="product.description" type="textarea" label="Descripcion" />
            <!-- Price -->
            <div class="row q-col-gutter-sm">
              <q-input
                class="col-6"
                v-model="product.sell_price"
                type="number"
                label="Precio Venta"
              />
              <q-input
                class="col-6"
                v-model="product.production_price"
                type="number"
                label="Precio Produccion"
              />
            </div>
            <!-- / Price -->

            <!-- Stock -->
            <div class="row q-col-gutter-sm">
              <q-select
                v-model="product.stock_status"
                :options="stockStatusOptions"
                emit-value
                map-options
                label="Inventario"
                class="col-6"
              />
              <q-input
                v-if="product.stock_status === 'limited'"
                v-model="product.stock_qty"
                type="number"
                label="Cantidad"
                class="col-6"
              />
            </div>
            <!-- / Stock -->
          </q-card-section>
          <q-card-actions vertical align="center">
            <q-btn flat label="Acualizar" color="primary" type="submit" />
          </q-card-actions>
        </q-card>
      </q-form>
    </section>
    <upload-image-popup v-model="showUploadImage" v-if="product" :product="product" />
  </q-page>
</template>

<script lang='ts'>
import { Component, Mixins } from 'vue-property-decorator';
import { AppMixin } from 'src/mixins';
import { IShopStore, QSelectOption, IImage } from 'src/types';
import { FunctionHelper } from 'src/helpers';
import { ShopProductStore, AppStore } from 'src/store/modules';

@Component({
  components: {
    'upload-image-popup': () =>
      import('components/popups/UploadImagePopup.vue'),
  },
})
export default class ProductEditPage extends Mixins(AppMixin) {
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

  showUploadImage = false;

  get productId() {
    return this.$route.query.product_id;
  }

  get imageSrc() {
    return FunctionHelper.handleImage(this.product?.image as IImage, 'lg');
  }

  get stockStatusOptions(): QSelectOption<IShopStore.ProductStockStatus>[] {
    return [
      {
        label: 'Infinito',
        value: 'infinity',
      },
      {
        label: 'Por Pedidos',
        value: 'backorder',
      },
      {
        label: 'Limitado',
        value: 'limited',
      },
    ];
  }

  openUploadImagePopup() {
    this.showUploadImage = true;
  }

  submit() {
    this.$q.loadingBar.start();
    ShopProductStore.updateAction({
      product_id: Number(this.product?.id),
      title: this.product?.title,
      description: this.product?.description,
      production_price: this.product?.production_price,
      sell_price: this.product?.sell_price,
      stock_status: this.product?.stock_status,
      stock_qty: this.product?.stock_qty,
    })
      .then(() => {
        this.$router.back();
        this.$q.loadingBar.stop();
      })
      .catch((_err) => AppStore.handleErrors(_err))
      .finally(() => this.$q.loadingBar.stop());
  }
}
</script>