<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
@Component
export default class App extends Vue {
  created() {
    this.$q.loadingBar.setDefaults({
      color: 'accent',
      size: '0.3rem',
      position: 'top',
    });
  }
}
</script>
