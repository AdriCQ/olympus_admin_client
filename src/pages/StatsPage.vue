<template>
  <q-page>
    <q-card>
      <q-card-section>
        <div class="text-h6">Estadísticas</div>
      </q-card-section>
      <q-card-section>
        <range-stats-form @result="handleResult" />
      </q-card-section>
      <q-card-section v-if="stats">
        <b>Cantidad por productos</b>
        <ul>
          <li v-for="(p,pKey) in stats.cant_products" :key="`cant-product${pKey}`">
            {{ pKey }}:
            &nbsp;{{ p }}
          </li>
        </ul>

        <b>Entradas por productos</b>
        <ul>
          <li v-for="(p,pKey) in stats.money_product" :key="`money-product${pKey}`">
            {{ pKey }}:
            &nbsp;${{ Number(p).toFixed(2) }}
          </li>
        </ul>
        <br />
        <b>Total de pedidos: {{ stats.cant_pedidos }}</b>
        <br />
        <b>Total productos: {{ stats.total_products }}</b>
        <br />
        <b>Total de entrada: ${{ Number(stats.total_money).toFixed(2) }}</b>
        <br />
        <b>Total de inversion: ${{ Number(stats.inversion).toFixed(2) }}</b>
        <br />
        <b>Total de Ganancia: ${{ Number(stats.earn).toFixed(2) }}</b>
        <br />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang='ts'>
import { IStatsService } from 'src/types';
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {
    'range-stats-form': () => import('components/forms/RangeStatsForm.vue'),
  },
})
export default class StatsPage extends Vue {
  stats: IStatsService.StatsResponse | null = null;

  handleResult(_r: IStatsService.StatsResponse) {
    this.stats = _r;
  }
}
</script>
