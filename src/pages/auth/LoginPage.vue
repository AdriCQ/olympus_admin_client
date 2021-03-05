<template>
  <q-page padding>
    <div class="row justify-center q-py-md q-px-sm">
      <div class="col-auto">
        <q-btn :to="{name: 'main.home'}" :ripple="false" round unelevated class="q-mb-md">
          <q-avatar size="70px" color="dark">
            <img src="icons/logo_x98.png" alt="logo" />
          </q-avatar>
        </q-btn>
      </div>

      <div class="col-12">
        <login-form />
      </div>
    </div>
  </q-page>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {
    'login-form': () => import('components/forms/LoginForm.vue'),
  },
})
export default class LoginPage extends Vue {}
</script>