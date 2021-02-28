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

}