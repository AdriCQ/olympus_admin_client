<template>
  <q-page>
    <q-form @submit.prevent="login" class="fit row wrap justify-center items-start content-center">
      <q-card class="login-form">
        <q-card-section>
          <div class="text-h6 text-center q-mb-xs">Inicio de Sesión</div>
          <q-input name="user" v-model="loginForm.mobile_phone" label="Telefono">
            <template v-slot:before>
              <q-icon name="mdi-phone" />
            </template>
          </q-input>
          <q-input
            name="password"
            v-model="loginForm.password"
            class="q-mt-xs"
            type="password"
            label="Contraseña"
          >
            <template v-slot:before>
              <q-icon name="mdi-lock" />
            </template>
          </q-input>
        </q-card-section>
        <q-card-actions vertical align="center">
          <q-btn label="Iniciar" type="submit" color="primary" />
        </q-card-actions>
      </q-card>
    </q-form>
  </q-page>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
import { UserStore, AppStore } from 'src/store/modules';
import { IUserService } from 'src/types';

@Component
export default class LoginPage extends Vue {
  loginForm: IUserService.LoginRequest = {
    mobile_phone: '',
    password: '',
  };

  login() {
    this.$q.loading.show();
    UserStore.loginAction(this.loginForm)
      .catch((_error) => {
        AppStore.handleErrors(_error);
      })
      .then(() => {
        void this.$router.push({
          name: 'main.home',
        });
      })
      .finally(() => this.$q.loading.hide());
  }
}
</script>