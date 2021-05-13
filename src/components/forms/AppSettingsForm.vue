<template>
  <div>
    <q-card-section class="q-gutter-y-xs">
      <q-toggle
        v-model="form.enable"
        :label="`${form.enable?'Abierta':'Cerrada'}`"
        :color="`${form.enable? 'green': 'red'}`"
        keep-color
      />
      <q-input
        v-model="form.min_price"
        type="number"
        label="Precio Mínimo"
        min="0"
        step="0.01"
        outlined
      />
      <q-input
        v-model="form.extra_price"
        type="number"
        label="Precio Extra"
        min="0"
        step="0.01"
        outlined
      />
    </q-card-section>
    <q-card-actions>
      <q-btn color="positive" :loading="loading" @click="submit" label="Actualizar" />
    </q-card-actions>
  </div>
</template>

<script lang='ts'>
import { PALREY_APP_TOKEN } from 'src/helpers';
import { AppStore } from 'src/store/modules';
import { IOlympusService } from 'src/types';
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class AppSettingsForm extends Vue {
  beforeMount() {
    this.form = {
      ol_app_token: PALREY_APP_TOKEN,
      min_price: this.palrey?.settings?.min_price
        ? Number(this.palrey?.settings?.min_price)
        : 40,
      extra_price: this.palrey?.settings?.extra_price
        ? Number(this.palrey?.settings?.extra_price)
        : 0,
      enable: this.palrey?.settings?.enable
        ? Boolean(this.palrey?.settings?.enable)
        : false,
    };
  }

  appOpen = false;

  form: IOlympusService.SettingsRequest = {
    ol_app_token: PALREY_APP_TOKEN,
    min_price: 40,
    extra_price: 0,
    enable: false,
  };

  loading = false;

  get palrey() {
    return AppStore.palrey;
  }

  submit() {
    this.loading = true;
    AppStore.setSettingsAction(this.form)
      .then((_resp) => console.log('Application Palrey', _resp))
      .catch((_err) => AppStore.handleErrors(_err))
      .finally(() => {
        this.loading = false;
      });
  }
}
</script>