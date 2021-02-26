<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script lang="ts">
import { QSpinnerTail } from 'quasar';
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class App extends Vue {
  created() {
    this.$q.loading.setDefaults({
      // @ts-ignore
      spinner: QSpinnerTail,
    });
  }
}
</script>
