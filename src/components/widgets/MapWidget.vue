<template>
  <l-map
    ref="map"
    id="map-leaflet"
    :key="`map-key-${_key}`"
    :zoom="Number(zoom)"
    :center="center"
    :min-zoom="Number(minZoom)"
    :max-zoom="Number(maxZoom)"
    @click="addMarker"
    @update:center="doMoveCenter"
    @update:zoom="doMoveZoom"
    @ready="mapReady"
    class="full-form"
  >
    <l-tilelayer :url="url" :attribution="attribution"></l-tilelayer>

    <l-marker key="current-position" v-if="mapCurrentPosition" :lat-lng="mapCurrentPosition" />
  </l-map>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';
import { LatLng, latLng, LocationEvent, Icon } from 'leaflet';
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

const palmiraCenter = latLng(22.241354, -80.392777);

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
export default class MapWidget extends Vue {
  created() {
    this.mapCenter = this.center;
    this.mapZoom = this.zoom;
    this.mapCurrentPosition = this.marker
      ? latLng(this.marker.lat, this.marker.lng)
      : null;
    this._key++;
  }

  @Prop({
    type: Object,
    default: () => palmiraCenter,
  })
  readonly center!: LatLng;

  @Prop({ type: [Number, String], default: 15 }) readonly zoom!: number;

  @Prop({ type: Object }) readonly marker!: LatLng;
  @Prop({ type: [Number, String], default: 15 }) readonly minZoom!: number;
  @Prop({ type: [Number, String], default: 18 }) readonly maxZoom!: number;
  @Prop(Boolean) readonly noEdit!: boolean;

  _key = 0;
  attribution = '&copy; Palrey';
  // attribution = '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  mapCenter: LatLng = palmiraCenter;
  mapZoom = 15;
  mapCurrentPosition: LatLng | null = null;

  get url() {
    if (this.mapZoom > 16) {
      this.$emit('internetRequired', true);
      return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    }
    this.$emit('internetRequired', false);
    return 'maps/{z}/{x}/{y}.png';
  }

  mapReady() {
    this.doMoveCenter(this.mapCenter);
  }

  addMarker(event: LocationEvent) {
    if (!this.noEdit) {
      this.mapCurrentPosition = latLng(event.latlng.lat, event.latlng.lng);
      this.$emit('positionSet', this.mapCurrentPosition);
    }
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