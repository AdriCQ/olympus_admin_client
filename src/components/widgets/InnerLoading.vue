<template>
  <q-inner-loading :showing="loading">
    <q-spinner-tail size="35px" color="primary" />
  </q-inner-loading>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class InnerLoading extends Vue {
  @Prop({
    type: Boolean,
    default: false,
  })
  readonly loading!: boolean;
}
</script>