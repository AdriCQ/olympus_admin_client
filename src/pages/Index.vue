<template>
  <q-page padding>
    <q-card>
      <q-card-section class="px-none" style="height: 300px; width: 100%">
        <map-widget />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
    'map-widget': () => import('components/widgets/MapWidget.vue'),
  },
})
export default class PageIndex extends Vue {}
</script>
