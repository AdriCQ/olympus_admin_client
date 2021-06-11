import { IDictionary } from '../mix';
export namespace IStatsService
{
  interface StatsRequest
  {
    date_since?: string;
    date_until?: string;
    month?: number;
    day?: number;
    date?: string;
  }

  interface StatsResponse
  {
    total_money: number;
    total_products: number;
    cant_pedidos: number;
    money_products: IDictionary<number>[];
    cant_products: IDictionary<number>[];
    earn: number;
    inversion: number;
  }
}