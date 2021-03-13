<template>
  <q-page padding>
    <users-basic-stats-section />
  </q-page>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {
    'users-basic-stats-section': () =>
      import('components/sections/UsersBasicStatsSection.vue'),
  },
})
export default class UserHomePage extends Vue {}
</script>