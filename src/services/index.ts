import { AxiosError } from 'axios';
import { IServices, IDictionary } from 'src/types';
import { UserStore } from 'src/store/modules';

export class ServiceProvider
{
  static callableService (_service: IServices.ApiResponse<unknown>, _callback: CallableFunction)
  {
    return new Promise((resolve, reject) =>
    {
      _service.then(_response =>
      {
        const _resp = _response.data;
        // console.log(_response.data);
        if (_resp.STATUS)
          resolve(_callback(_resp.DATA));
        else
        {
          const errors: string[] = [];
          if (Array.isArray(_resp.ERRORS))
          {
            for (const error of _resp.ERRORS as unknown[])
            {
              errors.push(String(error));
            }
          }
          else
          {
            for (const error in _resp.ERRORS as IDictionary<string | string[]>)
            {
              errors.push(String(_resp.ERRORS[error]));
            }
          }
          reject(errors);
        }
      }).catch((_error: AxiosError<IServices.iApiResponse<unknown>>) =>
      {
        // console.log(_error.code);
        if (_error.response && _error.response.status)
        {
          // Manual Handle errors
          switch (_error.response.status)
          {
            case 401:
              UserStore.logout();
              break;

          }
        }
        if (_error.response?.data)
        {
          const errors: string[] = [];
          const _resp = _error.response?.data;
          if (Array.isArray(_resp.ERRORS))
          {
            for (const error of _resp.ERRORS as unknown[])
            {
              errors.push(String(error));
            }
          }
          else
          {
            for (const error in _resp.ERRORS as IDictionary<string | string[]>)
            {
              errors.push(String(_resp.ERRORS[error]));
            }
          }
          reject(errors);
        }
        else
        {
          reject([_error])
        }
      })
    })
  }
}

export * from './OlympusService';
export * from './ShopOrder';
export * from './ShopProductService';
export * from './UserService';
export * from './StatsService';
