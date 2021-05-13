import { IStatsService } from 'src/types';
import axios from 'axios';
import { AxiosResponse } from 'axios';

export class StatsService
{
  private static BASE_PATH = '';

  public static stats (_params: IStatsService.StatsRequest): Promise<AxiosResponse<IStatsService.StatsResponse>>
  {
    return axios.get(this.BASE_PATH + '/stats', { params: _params })
  }
}