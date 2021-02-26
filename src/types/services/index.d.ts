import { AxiosResponse } from 'axios';

export namespace IServices
{
  /**
   * @interface ApiResponse<T>
   */
  interface iApiResponse<T>
  {
    STATUS: boolean;
    DATA: T;
    ERRORS: never;
  }

  interface PaginatedData<T>
  {
    data: T;
    current_page: number;
    first_page_url: string;
    from: number;
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string;
    to: number;
  }
  interface Paginated<T>
  {
    STATUS: boolean;
    DATA: PaginatedData<T>;
    ERRORS: never;
  }

  /**
   * @type ApiResponse<T>
   */
  type ApiResponse<T> = Promise<AxiosResponse<iApiResponse<T>>>;
  type ApiResponsePaginated<T> = Promise<AxiosResponse<Paginated<T>>>;
}