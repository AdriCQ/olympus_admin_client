<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <p>{{ display }}</p>
      </q-card-section>
      <q-card-section class="px-none" style="height: 300px; width: 100%">
        <q-btn color="primary" label="X-TOKEN" @click="getToken" />
        <q-btn color="primary" label="Login" @click="login" />
        <q-btn color="primary" label="checkUser" @click="checkUser" />
        <q-btn color="primary" label="Logout" @click="logout" />
        <q-btn color="primary" label="List Products" @click="listProducts" />
        <q-btn color="primary" label="StoreOrder" @click="storeOrder" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import {
  UserService,
  ShopProductService,
  ShopOrderService,
} from 'src/services';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
    'map-widget': () => import('components/widgets/MapWidget.vue'),
  },
})
export default class PageIndex extends Vue {
  display = '';
  getToken() {
    void this.$axios
      .get('/sanctum/csrf-cookie')
      .then((_resp) => (this.display = JSON.stringify(_resp)))
      .then((_err) => (this.display = JSON.stringify(_err)));
  }
  checkUser() {
    void this.$axios
      .get('/api/user')
      .then((_resp) => (this.display = JSON.stringify(_resp)))
      .then((_err) => (this.display = JSON.stringify(_err)));
  }
  login() {
    UserService.login({
      mobile_phone: '53375180',
      password: 'password',
    })
      .then((_resp) => (this.display = JSON.stringify(_resp)))
      .catch((_err) => (this.display = JSON.stringify(_err)));
  }

  logout() {
    void UserService.logout()
      .then((_resp) => (this.display = JSON.stringify(_resp)))
      .catch((_err) => (this.display = JSON.stringify(_err)));
  }

  listProducts() {
    void ShopProductService.filter({})
      .then((_resp) => (this.display = JSON.stringify(_resp)))
      .catch((_err) => (this.display = JSON.stringify(_err)));
  }

  storeOrder() {
    void ShopOrderService.store({
      products: [
        {
          id: 1,
          qty: 12,
        },
      ],
      shipping_address: 'asdasd',
      coordinates: {
        lat: 0,
        lng: 0,
      },
    })
      .then((_resp) => (this.display = JSON.stringify(_resp)))
      .catch((_err) => (this.display = JSON.stringify(_err)));
  }
}
</script>
