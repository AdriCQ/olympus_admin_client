<template>
  <section>
    <q-page padding>
      <q-card bordered>
        <q-card-section>
          <div class="text-h6">Usuarios</div>
          <div class="text-subtitle2">Datos Básicos</div>
        </q-card-section>
        <q-card-section>
          <q-table
            title="Usuarios"
            :data="usersData"
            :columns="columns"
            row-key="name"
            dark
            color="amber"
          />
        </q-card-section>
      </q-card>
    </q-page>
  </section>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
import { IUserStore, IVue } from 'src/types';

@Component
export default class UsersBasicStatsSection extends Vue {
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

  usersData: IUserStore.User[] = [
    {
      id: 1,
      name: 'Adrian Capote',
      mobile_phone: '53375180',
      address: '',
    },
  ];
}
</script>