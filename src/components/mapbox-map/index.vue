<template>
<div class="mapbox-map">
  <mgl-map
    mapStyle="mapbox://styles/mapbox/light-v10"
    :accessToken="mapboxToken"
    @load="onMapLoaded"
    id = "map"

  >
    <MglNavigationControl position="bottom-right"/>
    <MglGeolocateControl position="bottom-right" />

    <MglGeocoderControl
      :accessToken="mapboxToken"
    />

    <!-- Map Layers -->
    <map-layer
        v-for="layer in wmsLayers"
        :key="layer.id"
        :options="layer"
      />


  </mgl-map>
</div>
</template>

<script>

import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import Mapbox from 'mapbox-gl';
import { MglMap,MglNavigationControl, MglGeolocateControl } from 'vue-mapbox';
import MglGeocoderControl from "vue-mapbox-geocoder";
import MapLayer from './map-layer.js';

export default {
  components: {
    MglMap,
    MapLayer,
    MglNavigationControl,
    MglGeolocateControl,
    MglGeocoderControl,
  },

  computed: {
    mapboxToken() {
      return process.env.VUE_APP_MAPBOX_TOKEN;
    },

    wmsLayers() {
      return this.$store.getters['mapbox/wmsLayers'];
    },
    // mapBaseLayers() {
    //   return MAP_BASELAYERS;
    // }
  },

  methods: {
    onMapLoaded({ map }) {
      this.$root.map = map;
      map.addLayer({
          'id': 'wms-test-layer',
          'type': 'raster',
          'source': {
              'type': 'raster',
              'tiles': [
                    'https://img.nj.gov/imagerywms/Natural2015?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&layers=Natural2015'
                      ],
              'tileSize': 256
          },
          'paint': {}
          }, 'aeroway-line',

          {'id': 'shallow_wells',
          'type': 'raster',
          'source': {
              'type': 'raster',
              'tiles': [
                    'http://localhost:8080/geoserver/cite/wms?service=WMS&version=1.1.0&request=GetMap&layers=cite%3Ashallow_wells&bbox=1116876.0%2C157777.0%2C1136101.0%2C173898.0&width=768&height=644&srs=EPSG%3A26982'
                      ],
              'tileSize': 256
          },
          'paint': {}}

          );

      map.flyTo({
        center: [-90.09, 29.98],
        zoom: 9,
        speed: 1
      });
    }
  },

  created() {
    this.mapbox = Mapbox;
  },
};

</script>

<style>
.mapbox-map {
  width: 100%;
  height: 100%;
}
</style>
