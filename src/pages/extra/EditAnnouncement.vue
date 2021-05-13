<template>
  <q-page padding>
    <q-form @submit.prevent="submit">
      <q-card>
        <q-card-section>
          <div class="text-h6 text-center">Editar Anuncio</div>
        </q-card-section>
        <q-card-section class="q-gutter-y-xs">
          <q-input v-model="form.title" type="text" label="Título" outlined />
          <q-input v-model="form.text" type="textarea" label="Texto" outlined />
          <q-input v-model="form.icon" type="text" label="Icono" outlined />
        </q-card-section>
        <q-card-actions>
          <q-btn
            color="primary"
            :loading="loading"
            icon="mdi-check"
            label="Actualizar"
            type="submit"
          />
          <q-btn
            color="negative"
            :loading="loading"
            icon="mdi-close"
            label="Eliminar"
            @click="remove"
          />
        </q-card-actions>
      </q-card>
    </q-form>
  </q-page>
</template>

<script lang='ts'>
import { AnnouncementStore } from 'src/store/modules';
import { IAnnouncement } from 'src/types';
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class EditAnnouncement extends Vue {
  beforeMount() {
    this.form = {
      announcement_id: (this.announcement as IAnnouncement.Announcement).id,
      type: this.announcement?.type as IAnnouncement.Type,
      active: this.announcement?.active,
      title: this.announcement?.title,
      text: this.announcement?.text,
      link: this.announcement?.link,
      icon: this.announcement?.icon,
      html: this.announcement?.html,
    };
  }

  form: IAnnouncement.UpdateRequest = {
    announcement_id: 0,
    type: 'info',
    active: false,
    title: undefined,
    text: undefined,
    link: undefined,
    icon: undefined,
    html: undefined,
  };

  loading = false;

  get announcement() {
    return AnnouncementStore.announcement;
  }

  submit() {
    this.loading = true;
    AnnouncementStore.updateAction(this.form)
      .catch((_err) => console.log(_err))
      .then(() => this.$router.back())
      .finally(() => (this.loading = false));
  }

  remove() {
    this.loading = true;
    AnnouncementStore.removeAction(this.announcement?.id as number)
      .then(() => this.$router.back())
      .catch((_err) => console.log(_err))
      .finally(() => {
        this.loading = false;
      });
  }
}
</script>