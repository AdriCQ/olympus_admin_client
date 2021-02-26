<template>
  <l-map
    ref="map"
    id="map-leaflet"
    key="1"
    :zoom="mapInitialZoom"
    :center="mapInitialCenter"
    :max-zoom="16"
    :min-zoom="13"
    @click="addMarker"
    @update:center="doMoveCenter"
    @update:zoom="doMoveZoom"
    @ready="mapReady"
    class="full-form"
  >
    <l-tilelayer :url="url" :attribution="attribution"></l-tilelayer>

    <l-marker key="current-position" l-if="mapCurrentPosition" :lat-lng="mapCurrentPosition" />
  </l-map>
</template>

<script lang='ts'>
import { Vue, Component, Watch } from 'vue-property-decorator';
import { LatLng, latLng, LocationEvent } from 'leaflet';
import {
  LMap,
  LTileLayer,
  LMarker,
  LControl,
  LControlZoom,
  LIcon,
  LCircle,
  LCircleMarker,
  LTooltip,
} from 'vue2-leaflet';
import { Icon } from 'leaflet';

/* Fix leaflet icons */
type D = Icon.Default & {
  _getIconUrl: string;
};
// @ts-ignore
delete (Icon.Default.prototype as D)._getIconUrl;
Icon.Default.mergeOptions({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});
@Component({
  components: {
    'l-map': LMap,
    'l-tilelayer': LTileLayer,
    'l-marker': LMarker,
    'l-control': LControl,
    'l-controlZoom': LControlZoom,
    'l-mapIcon': LIcon,
    'l-circle': LCircle,
    'l-tooltip': LTooltip,
    'l-circle-marker': LCircleMarker,
  },
})
export default class MapForm extends Vue {
  url = 'maps/{z}/{x}/{y}.png';
  // url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  attribution =
    '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  mapInitialZoom = 14;
  mapZoom = this.mapInitialZoom;
  mapInitialCenter: LatLng = latLng(22.23988857204354, -80.3904175758362);
  mapCenter: LatLng = this.mapInitialCenter;
  mapCurrentPosition: LatLng | null = null;

  @Watch('reset')
  onResetChange() {
    this.doMoveCenter(this.mapInitialCenter);
    this.doMoveZoom(this.mapInitialZoom);
    this.mapCurrentPosition = null;
  }

  mapReady() {
    this.doMoveCenter(this.mapCenter);
  }

  addMarker(event: LocationEvent) {
    this.mapCurrentPosition = latLng(event.latlng.lat, event.latlng.lng);
  }

  /**
   * Update map data on center move
   */
  doMoveCenter(center: LatLng) {
    if (center == null) {
      return;
    }
    /* Update the map center */
    this.mapCenter = center;
  }

  /**
   * Update the map zoom
   */
  doMoveZoom(zoom: number) {
    this.mapZoom = zoom;
  }
}
</script>

<style lang="scss" scoped>
@import '~leaflet/dist/leaflet.css';
.map-leaflet {
  width: 100%;
  height: 100%;
}
</style>