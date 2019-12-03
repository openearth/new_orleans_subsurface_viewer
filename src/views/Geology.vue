<template>
  <div>
    <v-sheet class="pa-5">
      <v-switch
        v-for="layer in layers"
        :key="layer.value"
        :label="layer.label"
        :value="layer.value"
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

export default {
  data: () => ({
    layers: [
      {
        label: 'Shallow Wells',
        value: 'shallow_wells'
      }
    ],
    visibleLayers: []
  }),

  methods: {
    async addLayer(layerId) {
      const layer = await this.fakeRequestToBuildLayer(layerId);
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
    }
  },

  watch: {
    visibleLayers(newArray, oldArray) {
      const removeLayer = newArray.length < oldArray.length;
      if(removeLayer) {
        const layerToRemove = arrayDiff(oldArray, newArray)[0];
        this.removeLayer(layerToRemove);
      }
      else {
        const layerToAdd = arrayDiff(newArray, oldArray)[0];
        this.addLayer(layerToAdd);
      }
    }
  }
};

function arrayDiff(arrayA, arrayB) {
  return arrayA.filter(x => !arrayB.includes(x));
}
</script>
