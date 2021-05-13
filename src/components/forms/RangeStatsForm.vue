<template>
  <q-form @submit.prevent="onSubmit" class="q-gutter-md">
    <q-card-section>
      <q-date v-model="dateRange" range />
    </q-card-section>
    <q-card-actions>
      <q-btn
        type="submit"
        color="primary"
        icon="mdi-chart-line"
        :loading="btnLoading"
        size="sm"
        label="Calcular"
      />
    </q-card-actions>
  </q-form>
</template>

<script lang='ts'>
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Vue, Component } from 'vue-property-decorator';
import { date } from 'quasar';
import { StatsService } from 'src/services';
import { AppStore } from 'src/store/modules';

interface IDateRange {
  from: string;
  to: string;
}

@Component
export default class RangeStatsForm extends Vue {
  dateRange: string | IDateRange = date.formatDate(Date.now(), 'YYYY/MM/DD');
  btnLoading = false;
  onSubmit() {
    this.btnLoading = true;
    // @ts-ignore
    if (this.dateRange.to) {
      StatsService.stats({
        // @ts-ignore
        date_since: this.dateRange.from,
        // @ts-ignore
        date_until: this.dateRange.to,
      })
        .then((_resp) => {
          console.log(_resp);
          this.$emit('result', _resp.data);
        })
        .catch((_err) => AppStore.handleErrors(_err))
        .finally(() => (this.btnLoading = false));
    } else {
      StatsService.stats({
        date: this.dateRange as string,
      })
        .then((_resp) => {
          console.log(_resp);
          this.$emit('result', _resp.data);
        })
        .catch((_err) => AppStore.handleErrors(_err))
        .finally(() => (this.btnLoading = false));
    }
  }
}
</script>