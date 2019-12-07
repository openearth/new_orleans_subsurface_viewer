<template>
  <div>
    <v-card-title>
      Monitoring
    </v-card-title>
    <v-sheet class="pa-5">
      <v-switch
        v-for="layer in layers"
        :key="layer.id"
        :label="formatIdToLabel(layer.id)"
        :value="layer.id"
        v-model="visibleLayers"
        inset
        hide-details
      />
    </v-sheet>
  </div>
</template>

<script>
import getLocalJson from '@/data/get-local-json';
import buildGeojsonLayer from '@/lib/build-geojson-layer';
import arrayDiff from '@/lib/get-arrays-difference';
import formatIdToLabel from '@/lib/format-id-to-label';

export default {
  data: () => ({
    layers: [
      {
        id: 'shallow_wells'
      },
      {
        id: 'cross_sections'
      }
    ],
    visibleLayers: []
  }),

  methods: {
    async addLayer({ id }) {
      const layer = await this.fakeRequestToBuildLayer(id);
      this.$store.commit('mapbox/ADD_GEOJSON_LAYER', layer);
    },

    removeLayer(layerId) {
      this.$store.commit('mapbox/REMOVE_GEOJSON_LAYER', layerId);
    },

    async fakeRequestToBuildLayer(id) {
      const data = await getLocalJson(`${ id }.json`);
      return buildGeojsonLayer({
        id,
        data,
        type: 'circle'
      });
    },

    formatIdToLabel(id) {
      return formatIdToLabel(id);
    }
  },

  watch: {
    visibleLayers(newArray, oldArray) {
      const removeLayerId = newArray.length < oldArray.length;
      if(removeLayerId) {
        const layerToRemoveId = arrayDiff(oldArray, newArray)[0];
        this.removeLayer(layerToRemoveId);
      }
      else {
        const layerToAddId = arrayDiff(newArray, oldArray)[0];
        const layerToAdd = this.layers.find(({ id }) => id === layerToAddId);
        this.addLayer(layerToAdd);
      }
    }
  }
};
</script>
