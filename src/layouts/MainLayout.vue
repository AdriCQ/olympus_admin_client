<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-dark text-white">
        <q-btn
          flat
          dense
          round
          icon="mdi-menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-toolbar-title></q-toolbar-title>
        <div>
          {{ Number(dailyVisits) }}
          <q-icon name="mdi-eye-outline" />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-grey-1">
      <q-list>
        <q-item-label header class="text-grey-8">
          Hola, {{ userName }}
          <span class="float-right">
            <q-btn size="xs" @click="logout" icon="mdi-exit-to-app" />
          </span>
        </q-item-label>
        <drawer-link v-for="(link, key) in drawerLinks" :key="key" :link="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { AppStore, UserStore } from 'src/store/modules';
import { ILabelIconLink, IOlympusService } from 'src/types';

import { FunctionHelper, PALREY_APP_TOKEN } from 'src/helpers';
import { ServiceProvider, OlympusService } from 'src/services';

FunctionHelper.notificationsInterval();

@Component({
  components: {
    'drawer-link': () => import('components/layouts/DrawerLink.vue'),
  },
})
export default class MainLayout extends Vue {
  created() {
    /**
     * Get Daily Visits
     */
    void ServiceProvider.callableService(
      OlympusService.getAppInfo(PALREY_APP_TOKEN),
      (_resp: IOlympusService.Application) => {
        AppStore.palrey = _resp;
      }
    ).catch((_err) => console.log('AppInfoError', _err));
  }

  leftDrawerOpen = false;
  drawerLinks: ILabelIconLink[] = [
    {
      label: 'Pedidos',
      icon: 'mdi-cart',
      to: {
        name: 'shop.orders',
      },
    },
    {
      label: 'Productos',
      icon: 'mdi-gift',
      to: { name: 'shop.products' },
    },
    {
      icon: 'mdi-account-multiple-outline',
      label: 'Usuarios',
      to: { name: 'user.home' },
    },

    {
      icon: 'mdi-chart-line',
      label: 'Estadísticas',
      to: { name: 'main.stats' },
    },
    {
      icon: 'mdi-wrench',
      label: 'Ajustes',
      to: { name: 'main.settings' },
    },
  ];

  get appVersion() {
    return AppStore.version;
  }

  get dailyVisits() {
    return AppStore.palrey?.daily_visits;
  }

  get userName() {
    return UserStore.userName;
  }

  logout() {
    UserStore.logout();
  }
}
</script>
