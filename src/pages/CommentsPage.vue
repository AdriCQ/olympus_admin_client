<template>
  <q-page padding>
    <q-pull-to-refresh @refresh="loadData" color="white" bg-color="primary">
      <q-card class="no-box-shadow">
        <q-card-section class="text-center">
          <div class="text-h6">Comentarios</div>
          <div class="text-subtitle">
            <q-toggle v-model="mark" label="Diferenciar" />
          </div>
        </q-card-section>
        <q-card-section class="q-py-xs">
          <!-- List Comments -->
          <div
            style="max-width: 400px"
            class="q-pa-xs"
            v-for="(c, key) in comments"
            :key="`comment-${key}`"
          >
            <q-chat-message
              :name="`${c.user.mobile_phone} (${c.user.name})`"
              :text="[c.message]"
              :bg-color="chatBg(c.subject)"
              :text-color="chatTextColor(c.subject)"
            />
          </div>
          <!-- / List Comments -->
        </q-card-section>
      </q-card>
    </q-pull-to-refresh>
  </q-page>
</template>

<script lang='ts'>
import axios from 'axios';
import { AppMixin } from 'src/mixins';
import { AppStore } from 'src/store/modules';
import { IComment } from 'src/types';
import { Component, Mixins } from 'vue-property-decorator';

type ISubject = 'Queja' | 'Sugerencia' | 'Solicitud' | 'Agradecimiento';

@Component
export default class CommentsPage extends Mixins(AppMixin) {
  beforeMount() {
    this.loadData(() => {
      console.log('Before Mount');
    });
  }

  comments: IComment[] = [];
  mark = false;
  chatBg(_t: ISubject) {
    if (!this.mark) return 'grey-5';
    switch (_t) {
      case 'Queja':
        return 'negative';
      case 'Sugerencia':
        return 'warning';
      case 'Solicitud':
        return 'info';
      case 'Agradecimiento':
        return 'positive';
      default:
        return 'bg-grey-7';
    }
  }
  chatTextColor(_t: ISubject) {
    if (!this.mark) return 'black';
    switch (_t) {
      case 'Queja':
        return 'white';
      // case 'Agradecimiento':
      //   return 'negative';
      default:
        return 'black';
    }
  }

  loadData(_done: CallableFunction) {
    axios
      .get<IComment[]>('/comment')
      .then((_r) => {
        this.comments = _r.data;
      })
      .catch(() => {
        AppStore.handleErrors(['Error al cargar comentarios']);
      })
      .finally(() => {
        _done();
      });
  }
}
</script>