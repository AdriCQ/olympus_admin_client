<template>
  <q-card bordered class="q-mx-auto" style="max-width: 350px">
    <q-card-section class="q-pb-sm">
      <div class="text-h6">Inicio de Sesión</div>
    </q-card-section>
    <form @submit.prevent="submit">
      <q-card-section class="q-py-sm">
        <!-- Mobile Phone -->
        <div class="row">
          <div class="col">
            <q-input
              v-model="$v.form.mobile_phone.$model"
              label="Móvil"
              type="tel"
              mask="########"
              :error-message="mobilePhoneErrors"
              :error="isMobilePhoneErrors"
              bottom-slots
              no-error-icon
              dense
            >
              <template #before>
                <q-icon :color="isMobilePhoneErrors ? 'negative' : 'primary'" name="mdi-cellphone" />
              </template>
            </q-input>
          </div>
        </div>

        <!-- Password -->
        <div class="row">
          <div class="col">
            <q-input
              v-model="$v.form.password.$model"
              label="Contraseña"
              :type="showPassword? 'text' : 'password'"
              :error-message="passwordErrors"
              :error="isPasswordErrors"
              bottom-slots
              no-error-icon
              dense
            >
              <template #before>
                <q-icon :color="isPasswordErrors? 'negative' : 'primary'" name="mdi-key" />
              </template>

              <template #append>
                <q-icon
                  :name="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  class="cursor-pointer"
                  @click="showPassword = !showPassword"
                />
              </template>
            </q-input>
          </div>
        </div>
      </q-card-section>

      <!-- Actions -->
      <q-card-actions align="center">
        <q-btn
          color="primary"
          text-color="black"
          type="submit"
          label="Entrar"
          :loading="btnState"
          glossy
        />
      </q-card-actions>
    </form>
  </q-card>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
import { IUserService } from 'src/types';
import { required, minLength } from 'vuelidate/lib/validators';
import { AppStore, UserStore } from 'src/store/modules';

@Component({
  validations: {
    form: {
      mobile_phone: {
        required,
        startsWith: (_value: string) => _value.startsWith('5'),
        length: (_value: string) => _value.length == 8,
      },
      password: { required, minLength: minLength(6) },
    },
  },
})
export default class Login extends Vue {
  activated() {
    this.$v.form.$reset();
  }

  form: IUserService.LoginRequest = {
    mobile_phone: '',
    password: '',
  };

  formStatus = false;
  btnState = false;
  showPassword = false;

  /**
   * Error messages
   */
  get mobilePhoneErrors() {
    if (this.formStatus) {
      if (!this.$v.form.mobile_phone?.$dirty) return '';
      if (!this.$v.form.mobile_phone.required) return 'Requerido';
      if (!this.$v.form.mobile_phone.begin) return 'Debe comenzar con 5';
      if (!this.$v.form.mobile_phone.length) return 'Debe tener 8 números';
      else return '';
    } else return '';
  }

  get passwordErrors() {
    if (this.formStatus) {
      if (!this.$v.form.password?.$dirty) return '';
      if (!this.$v.form.password.required) return 'Requerido';
      if (!this.$v.form.password.minLength)
        return `Debe tener al menos ${String(
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          this.$v.form.password.$params.minLength.min
        )} caracteres`;
      else return '';
    } else return '';
  }

  get isMobilePhoneErrors() {
    return this.formStatus && this.$v.form.mobile_phone?.$error;
  }

  get isPasswordErrors() {
    return this.formStatus && this.$v.form.password?.$error;
  }

  /**
   * Methods
   */
  submit() {
    this.$v.form.$touch();
    this.formStatus = true;

    if (!this.$v.form.$invalid) {
      this.btnState = true;
      UserStore.loginAction(this.form)
        .then(() => {
          this.$q.notify({
            message: 'Ha iniciado sesión correctamente',
            type: 'positive',
          });
          void this.$router.push({ name: 'main.home' });
        })
        .catch((_errors: []) => AppStore.handleErrors(_errors))
        .finally(() => (this.btnState = false));
    }
  }
}
</script>