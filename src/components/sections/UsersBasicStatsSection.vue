<template>
  <section>
    <q-page padding>
      <q-card bordered>
        <q-card-section>
          <div class="text-h6">Usuarios</div>
          <div class="text-subtitle2">Datos Básicos</div>
        </q-card-section>
        <q-card-section>
          <q-table title="Usuarios" :data="usersData" :columns="columns" row-key="id" />
        </q-card-section>
        <q-card-actions align="center">
          <q-btn
            icon="mdi-skip-previous"
            :disable="!Boolean(prevPage)"
            @click="loadUsersData(prevPage)"
          />
          <q-btn
            icon="mdi-skip-next"
            :disable="!Boolean(nextPage)"
            @click="loadUsersData(nextPage)"
          />
        </q-card-actions>
      </q-card>
    </q-page>
  </section>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
import { IServices, IUserStore, IVue } from 'src/types';
import { ServiceProvider, UserService } from 'src/services';
import { AppStore } from 'src/store/modules';

@Component
export default class UsersBasicStatsSection extends Vue {
  created() {
    this.loadUsersData();
  }
  columns: IVue.QuasarTableColumn[] = [
    {
      name: 'id',
      required: true,
      label: 'ID',
      field: 'id',
      align: 'left',
      sortable: true,
    },
    {
      name: 'name',
      required: true,
      label: 'Nombre',
      field: 'name',
      align: 'left',
      sortable: true,
    },
    {
      name: 'mobile_phone',
      required: true,
      align: 'center',
      label: 'Celular',
      field: 'mobile_phone',
      sortable: true,
    },
  ];

  usersData: IUserStore.User[] = [];

  currentPage = 0;
  prevPage = 0;
  nextPage = 0;

  loadUsersData() {
    void ServiceProvider.callableService(
      UserService.filter({
        page: this.currentPage,
      }),
      (_resp: IUserStore.User[]) => {
        this.usersData = _resp;
      }
    ).catch((_err) => AppStore.handleErrors(_err));
  }
}
</script>