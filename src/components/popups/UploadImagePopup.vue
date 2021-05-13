<template>
  <q-dialog
    :value="value"
    persistent
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="bg-primary text-white">
      <q-bar>
        <q-space />
        <q-btn dense flat icon="mdi-close" @click="$emit('input', false)">
          <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section>
        <div class="text-h6">Seleccione la nueva imagen</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-uploader
          style="max-width: 300px"
          :factory="factoryFn"
          label="Restricted to images"
          accept=".jpg, image/*"
          max-files="1"
          @uploaded="onUploaded"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang='ts'>
import { UserStore } from 'src/store/modules';
import { Vue, Component, Prop } from 'vue-property-decorator';
import { SERVER_URL, APP_TOKEN } from 'src/helpers';
import { IShopStore } from 'src/types';

@Component
export default class UploadImagePopup extends Vue {
  @Prop(Boolean) readonly value!: boolean;
  @Prop(Object) readonly product!: IShopStore.Product;

  onUploaded(/* info: unknown */) {
    this.$router.back();
  }

  factoryFn(/* files: File[] */) {
    // returning a Promise

    return new Promise((resolve) => {
      // simulating a delay of 2 seconds
      setTimeout(() => {
        resolve({
          url: `${SERVER_URL}/api/shop/product/v-upload-image`,
          formFields: [
            { name: 'product_id', value: this.product.id },
            { name: 'ol_app_token', value: APP_TOKEN },
          ],
          method: 'POST',
          headers: [
            {
              name: 'Authorization',
              value: `Bearer ${String(UserStore.api_token)}`,
            },
          ],
          fieldName: 'image',
        });
      }, 200);
    });
  }
}
</script>