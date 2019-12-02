<template>
  <div class="mapbox-map">
    <v-mapbox
      class="mapbox-map__map"
      :access-token="mapBoxToken"
      :map-style="mapConfig.style"
      :center="mapConfig.center"
      :zoom="mapConfig.zoom"
      @mb-created="onMapCreated"
      id="map"
      ref="map"
    >

      <!-- Simple GeoJSON layers -->
      <map-layer
        v-for="layer in layers"
        :key="layer.id"
        :options="layer"
        :clickable="true"
        @click="layerClick"
      />

    </v-mapbox>
  </div>
</template>

<script>
import 'mapbox-gl/dist/mapbox-gl.css';
import { MAP_CENTER, MAP_ZOOM, MAP_BASELAYER_DEFAULT } from '@/lib/constants';
import MapLayer from './map-layer';

import getLocalJson from '@/data/get-local-json';
import buildGeojsonLayer from '@/lib/build-geojson-layer';


export default {
  components: {
    MapLayer
  },

  data: () => ({
    layers: []
  }),

  computed: {
    mapBoxToken() {
      return process.env.VUE_APP_MAPBOX_TOKEN;
    },
    mapConfig() {
      return {
        center: MAP_CENTER,
        zoom: MAP_ZOOM,
        style: MAP_BASELAYER_DEFAULT.style
      };
    }
  },

  methods: {
    onMapCreated(map) {
      this.$root.map = map;
      map.on('load', () => {
        this.$root.mapLoaded = true;
      });
    },
    // fitToBounds() {
    //   // @REFACTOR :: We do a simple flyto at the moment, we could also fit to actual bounds of layers
    //   this.$root.map.flyTo({
    //     center: this.mapConfig.center,
    //     zoom: this.mapConfig.zoom
    //   });
    // }
    layerClick(e) {
      const feature = e.features[0];
      console.log(feature);
    }
  },

  async mounted() {
    const shallow_wells_data = await getLocalJson('shallow_wells.json');
    const shallow_wells_layer = buildGeojsonLayer({
      id: 'shallow_wells',
      data: shallow_wells_data,
      type: 'circle'
    });
    this.layers.push(shallow_wells_layer);
  }
};
</script>

<style>
.mapbox-map {
  height: 100%;
  width: 100%;
}

.mapbox-map__map {
  height: 100%;
  width: 100%;
}
</style>
