import { IUserStore } from 'src/types';
/**
 * Iroute link
 */
export interface IRouteLink
{
  to?: IRoute;
}
/**
 * Iroute
 */
export interface IRoute
{
  name?: string;
  path?: string;
  query?: IDictionary<string>;
}

/**
 * Ilabel icon link
 */
export interface ILabelIconLink extends IRouteLink
{
  icon?: string;
  label?: string;
}

/**
 * Idictionary
 * @template T 
 */
export interface IDictionary<T>
{
  [key: string]: T;
}

/**
 * @interface IImage
 */
export interface IImage extends DBModel
{
  paths: {
    xs: string; sm: string; md: string; lg: string; xl: string;
  }
  title: string;
  tags?: string[];
}
/**
 * Dbmodel
 */
export interface DBModel
{
  id: number;
  created_at?: string;
  updated_at?: string;
}

/**
 * Qselect option
 */
export interface QSelectOption<T>
{
  label: string;
  value: T;
}

export interface IComment
{
  user: IUserStore.User;
  subject: string;
  message: string;
}