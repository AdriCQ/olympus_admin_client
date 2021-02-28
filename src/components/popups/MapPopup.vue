<template>
  <q-dialog
    :value="value"
    persistent
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card>
      <q-bar>
        <q-space />
        <q-btn dense flat icon="mdi-close" @click="$emit('input', false)">
          <q-tooltip>Cerrar</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section>
        <div class="text-h6">{{ address }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none" style="height: 80%">
        <map-widget v-bind="mapOptions" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang='ts'>
import { IVue } from 'src/types';
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  components: {
    'map-widget': () => import('components/widgets/MapWidget.vue'),
  },
})
export default class MapPopup extends Vue {
  maximizedToggle = true;

  @Prop(Object) readonly mapOptions!: IVue.IMapOptions;
  @Prop(Boolean) readonly value!: boolean;
  @Prop(String) readonly address!: string;
}
</script>