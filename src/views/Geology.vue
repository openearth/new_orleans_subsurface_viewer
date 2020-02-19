<template>
  <div>
    <v-card-title>
      Geology
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

const CIRCLE_STYLE = {
  layout: {},
  paint: {
    'circle-radius': 5,
    "circle-opacity" : 0.7,
    // 'circle-color': '#008fc5',
    'circle-color': [
        'match',
        ['get', 'layer'],
        'shallow_wells',
        '#54b04a',
        'deltares_campaign',
        '#5491e6',
        'deep_wells',
        '#cb706d',
        'nola_04',
        '#ffd28a',
/* other */ '#ccc'
]
  }
};
const LINE_STYLE = {
  layout: {
    'line-join': 'round',
    'line-cap': 'round'
  },
  paint: {
    'line-color': '#008fc5',
    'line-width': 4,
    'line-dasharray': [0.1, 1.8]
  }
};

export default {
  data: () => ({
    layers: [
      {
        id: 'boreholes',
        type: 'circle',
        source: 'layer',
      },
      {
        id: 'cross_sections',
        type: 'line'
      }
    ],
    visibleLayers: []
  }),

  methods: {
    async addLayer({ id, type }) {
      const layer = await this.fakeRequestToBuildLayer(id, type);
      this.$store.commit('mapbox/ADD_GEOJSON_LAYER', layer);
    },

    removeLayer(layerId) {
      this.$store.commit('mapbox/REMOVE_GEOJSON_LAYER', layerId);
    },

    async fakeRequestToBuildLayer(id, type) {
      const data = await getLocalJson(`${ id }.json`);
      const { layout, paint } = type === 'circle' ? CIRCLE_STYLE : LINE_STYLE;
      return buildGeojsonLayer({
        id,
        data,
        type,
        layout,
        paint
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
        this.$store.commit('mapbox/SET_LEGEND_LAYER', null);
      }
      else {
        const layerToAddId = arrayDiff(newArray, oldArray)[0];
        const layerToAdd = this.layers.find(({ id }) => id === layerToAddId);
        this.addLayer(layerToAdd);
        console.log(layerToAdd)
        this.$store.commit('mapbox/SET_LEGEND_LAYER', layerToAdd);
      }
    }
  }
};
</script>
