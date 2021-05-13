<template>
  <q-page>
    <q-card>
      <q-card-section>
        <div class="text-h6">Configuración</div>
      </q-card-section>

      <q-card-section>
        <app-settings-form />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang='ts'>
import { IStatsService } from 'src/types';
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {
    'app-settings-form': () => import('components/forms/AppSettingsForm.vue'),
  },
})
export default class SettingsPage extends Vue {}
</script>