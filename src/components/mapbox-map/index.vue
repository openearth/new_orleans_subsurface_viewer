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

          <!-- Map Controls -->
      <v-mapbox-geocoder />
      <v-mapbox-navigation-control position="top-right" />
      <map-control-baselayer
        :layers="mapBaseLayers"
        position="bottom-right"
      />

      <!-- Clickable GeoJSON layers -->
      <map-layer
        v-for="layer in geoJsonLayers"
        :key="layer.id"
        :options="layer"
        :clickable="true"
        @click="layerClick"
      />

      <!-- Raster layers -->
      <map-layer
        v-for="layer in rasterLayers"
        :key="layer.id"
        :options="layer"
      />

    </v-mapbox>
  </div>
</template>

<script>
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { MAP_CENTER, MAP_ZOOM, MAP_BASELAYER_DEFAULT, MAP_BASELAYERS} from '@/lib/constants';
import MapLayer from './map-layer';
import MapControlBaselayer from './map-control-baselayer';
// import MapControlFitbounds from './map-control-fitbounds';

export default {
  components: {
    MapLayer,
    MapControlBaselayer,
    // MapControlFitbounds,
  },

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
    },
    mapBaseLayers() {
      return MAP_BASELAYERS;
    },

    geoJsonLayers() {
      return this.$store.getters['mapbox/geoJsonLayers'];
    },
    rasterLayers() {
      return this.$store.getters['mapbox/rasterLayers'];
    }
  },

  methods: {
    onMapCreated(map) {
      this.$root.map = map;
      map.on('load', () => {
        this.$root.mapLoaded = true;
        this.$root.$emit('map-loaded');
      });
      
    },
    fitToBounds() {
      // @REFACTOR :: We do a simple flyto at the moment, we could also fit to actual bounds of layers
      this.$root.map.flyTo({
        center: this.mapConfig.center,
        zoom: this.mapConfig.zoom
      });
    },
    layerClick(e) {
      var features = this.$root.map.queryRenderedFeatures(e.point, { layers: [e.features[0].layer.source] });
      var feature = features[0];
      const layerId = feature.layer.id;
      const { uid } = feature.properties;
      this.$store.commit('mapbox/SET_ACTIVE_FEATURE', {
        layerId,
        uid
      });
    }
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
