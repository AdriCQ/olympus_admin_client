<template>
  <q-item clickable tag="a" :to="link.to">
    <q-item-section avatar>
      <q-icon v-if="link.icon" :name="link.icon" />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ link.label }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { ILabelIconLink } from 'src/types';

@Component
export default class DrawerLink extends Vue {
  @Prop(Object) readonly link!: ILabelIconLink;
}
</script>
