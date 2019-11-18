<template>
<div class="mapbox-map">
  <mgl-map
    mapStyle="mapbox://styles/mapbox/streets-v11"
    :accessToken="mapboxToken"
  >

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

  created() {
    this.mapbox = Mapbox;
  }
};
</script>

<style>
.mapbox-map {
  width: 100%;
  height: 100%;
}
</style>
