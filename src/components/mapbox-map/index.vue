<template>
<div class="mapbox-map">
  <mgl-map
    mapStyle="mapbox://styles/mapbox/light-v10"
    :accessToken="mapboxToken"
    @load="onMapLoaded"
  >
        <!-- Map Controls -->
      <v-mapbox-geocoder />
      <v-mapbox-navigation-control position="bottom-right" />

      <!-- Map Layers -->
      <!-- <map-layer
        v-for="layer in wmsLayers"
        :key="layer.id"
        :options="layer" -->
      />
  </mgl-map>
</div>
</template>

<script>
import 'mapbox-gl/dist/mapbox-gl.css';
import Mapbox from 'mapbox-gl';
import { MglMap } from 'vue-mapbox';


export default {
  components: {
    MglMap
  },

  computed: {
    mapboxToken() {
      return process.env.VUE_APP_MAPBOX_TOKEN;
    }
  },

  methods: {
    onMapLoaded({ map }) {
      this.$root.map = map;

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
