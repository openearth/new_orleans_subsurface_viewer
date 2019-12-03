<template>
  <div>
    <v-sheet class="pa-5">
      <v-switch
        v-for="feature in features"
        :key="feature.value"
        :label="feature.label"
        :value="feature.value"
        v-model="visibleFeatures"
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
    features: [
      {
        label: 'Shallow Wells',
        value: 'shallow_wells'
      }
    ],
    visibleFeatures: []
  }),

  methods: {
    async addFeature(featureId) {
      const layer = await this.fakeRequestToBuildLayer(featureId);
      this.$store.commit('mapbox/ADD_GEOJSON_LAYER', layer);
    },

    removeFeature(featureId) {
      this.$store.commit('mapbox/REMOVE_GEOJSON_LAYER', featureId);
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
    visibleFeatures(newArray, oldArray) {
      const removeFeature = newArray.length < oldArray.length;
      if(removeFeature) {
        const featureToRemove = arrayDiff(oldArray, newArray)[0];
        this.removeFeature(featureToRemove);
      }
      else {
        const featureToAdd = arrayDiff(newArray, oldArray)[0];
        this.addFeature(featureToAdd);
      }
    }
  }
};

function arrayDiff(arrayA, arrayB) {
  return arrayA.filter(x => !arrayB.includes(x));
}
</script>
