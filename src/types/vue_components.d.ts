export namespace IVue
{
  interface ILatLng
  {
    lat: number;
    lng: number;
  }

  interface IMapOptions
  {
    center?: ILatLng;
    zoom?: number;
    marker?: ILatLng;
    minZoom?: number;
    maxZoom?: number;
    noEdit?: boolean;
  }

  interface QuasarTableColumn
  {
    name: string;
    label: string;
    field: string;
    required?: boolean;
    align?: 'left' | 'center' | 'right',
    sortable?: boolean;
    style?: string;
    classes?: string;
  }

}