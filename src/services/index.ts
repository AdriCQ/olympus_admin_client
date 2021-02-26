import { IServices } from 'src/types';

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
          for (const error of _resp.ERRORS as unknown[])
          {
            errors.push(String(error));
          }
          reject(errors);
        }
      }).catch(error =>
      {
        if (Array.isArray(error))
          reject(error);
        else
          reject([error])
      })
    })
  }
}

export * from './ShopOrder';
export * from './ShopProductService';
export * from './UserService';