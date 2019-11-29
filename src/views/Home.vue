<template>
  <div>
    <risks-list
        :risks="risks"
        :activeLegendLayer="legendLayer || ''"
        @updateVisibility="onVisibilityChange"
        @updateLegend="onLegendChange"
        class="mb-8"
      />
  </div>
</template>

<script>
// import debounce from 'lodash.debounce';
// import wps from '@/lib/wps';
import { shallowWells } from '@/lib/project-layers';
// import buildWmsLayer from '@/lib/build-wms-layer';
import RisksList from '@/components/risks-list';

export default {
  components: {
    RisksList,
  },

    computed: {
      risks() {
        return this.$store.getters['mapbox/layersWithVisibility'];
      },
      riskVisibilityProxies() {
        return this.$store.getters['mapbox/layerVisibilityProxies'];
      },
      legendLayerId() {
        return this.$store.getters['mapbox/legendLayerId'];
      },
      edgeSize() {
        return this.$store.getters['priorities/edgeSize'];
      },
      legendLayer() {
        return this.$store.getters['mapbox/legendLayer'];
      },
      priorities() {
        return this.$store.getters['priorities/priorities'];
      },
      prioritiesMatrix() {
        return this.$store.getters['priorities/prioritiesMatrix'];
      }
    },

  methods: {

    onVisibilityChange(id) {
      const map = this.$root.map;
      this.$store.commit('mapbox/UPDATE_LAYER_VISIBILITY', { id, map });
    },
    onLegendChange(layer) {
      this.$store.commit('mapbox/SET_LEGEND_LAYER', this.legendLayer === layer ? null : layer);
    },

    mapAddLayer (shallowWells) {

      this.$store.commit('mapbox/ADD_WMS_LAYER', shallowWells);

    }
  }
};
</script>
