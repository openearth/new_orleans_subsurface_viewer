<template>
  <div>
    <v-card-title>
      Data & Maps
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
import arrayDiff from '@/lib/get-arrays-difference';
import formatIdToLabel from '@/lib/format-id-to-label';
import buildWmsLayer from '@/lib/build-wms-layer';

export default {
  data: () => ({
    layers: [
      {
        id: 'LiDAR_DEM_1m',
        layer: 'new_orleans_geo:LiDAR_DEM_1m'
      },
       {
        id: 'groundwater_levels_msl',
        layer: 'new_orleans_data:groundwater_levels_msl'
      },
      {
        id: 'Lithology',
        layer: 'new_orleans_geo:Lithology'
      },
      {
        id: 'shallow_subsidence_vulnerability',
        layer: 'new_orleans_data:shallow_subsidence_vulnerability'
      },
      {
        id: 'sequence_types',
        layer: 'new_orleans_data:sequence_types'
      }
    ],
    visibleLayers: [],
  }),

  computed: {
    rasterLayers() {
      return this.$store.getters['mapbox/rasterLayers'];
    },
     legendLayer() {
      return this.$store.getters['mapbox/legendLayer'];
    }
  },

  methods: {
    addLayer(layer) {
      const wmsLayer = buildWmsLayer(layer);
      this.$store.commit('mapbox/ADD_RASTER_LAYER', wmsLayer);

    },

    removeLayer(layerId) {
      this.$store.commit('mapbox/REMOVE_RASTER_LAYER', layerId);

    },

    formatIdToLabel(id) {
      return formatIdToLabel(id);
    }
  },

  watch: {
    visibleLayers(newArray, oldArray) {
      // console.log("Visible layers is activated!");
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
        this.$store.commit('mapbox/SET_LEGEND_LAYER', layerToAdd.layer);
      }
    }
  }
};
</script>
