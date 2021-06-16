<template>
  <q-card class="text-center">
    <q-card-section v-if="announcement.image">
      <q-img :src="imageSrc" width="120px" spinner-color="primary" spinner-size="82px" />
    </q-card-section>
    <q-card-section v-else>
      <q-icon :name="announcement.icon" v-if="announcement.icon" size="32px" />
      <p class="text-h6" v-if="announcement.title">{{ announcement.title }}</p>
      <p v-if="announcement.text">{{ announcement.text }}</p>
    </q-card-section>
    <q-card-actions>
      <q-btn label="Editar" dense @click="edit" />
      <q-btn
        :label="`${announcement.active ? 'ON':'OFF'}`"
        :color="`${announcement.active ?'green':'red'}`"
        dense
        @click="toggleActive"
        :loading="loading"
      />
    </q-card-actions>
  </q-card>
</template>

<script lang='ts'>
import { FunctionHelper } from 'src/helpers';
import { AnnouncementStore } from 'src/store/modules';
import { IAnnouncement } from 'src/types';
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class extends Vue {
  @Prop(Object) readonly announcement!: IAnnouncement.Announcement;

  loading = false;

  get imageSrc() {
    if (this.announcement.image)
      return FunctionHelper.handleImage(this.announcement.image, 'lg');
  }
  edit() {
    AnnouncementStore._announcement = this.announcement;
    this.$router
      .push({ name: 'main.ann.edit' })
      .catch((_err) => console.log(_err));
  }

  toggleActive() {
    this.loading = true;
    AnnouncementStore.updateAction({
      type: this.announcement.type,
      announcement_id: this.announcement.id,
      active: !this.announcement.active,
    })
      .then((_ann) => {
        AnnouncementStore.setAnnouncementById({
          id: this.announcement.id,
          ann: _ann,
        });
        this.$emit('update', _ann);
      })
      .catch((_err) => console.log('Ann Widget Error', _err))
      .finally(() => (this.loading = false));
  }
}
</script>