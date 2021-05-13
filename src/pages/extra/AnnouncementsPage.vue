<template>
  <q-page class="q-gutter-y-xs" padding>
    <q-card class="no-box-shadow">
      <q-card-section>
        <div class="text-h6 text-center">Anuncios</div>
        <div class="text-subtitle2">
          <q-icon name="mdi-plus" class="q-mr-xs" />Nuevo
        </div>
      </q-card-section>
    </q-card>
    <template v-if="announcements.length">
      <announcement-widget
        v-for="(ann, annKey) in announcements"
        :key="`ann-${annKey}-fresh-${freshKey}`"
        :announcement="ann"
        @update="freshKey++"
      />
    </template>
  </q-page>
</template>

<script lang='ts'>
import { AnnouncementStore, AppStore } from 'src/store/modules';
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {
    'announcement-widget': () =>
      import('components/widgets/AnnouncementWidget.vue'),
  },
})
export default class AnnouncementsPage extends Vue {
  beforeMount() {
    AnnouncementStore.listAction().catch((_err) => AppStore.handleErrors(_err));
  }

  freshKey = 0;

  get announcements() {
    return AnnouncementStore.announcements;
  }
}
</script>