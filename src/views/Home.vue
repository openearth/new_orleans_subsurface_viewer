<template>
  <div>
    Sideview
  </div>
</template>

<script>
import debounce from 'lodash.debounce';
import wps from '@/lib/wps';
import { priorities } from '@/lib/project-layers';
// import RisksList from '@/components/risks-list';

export default {
  components: {
    // RisksList,

  },
  data: () => ({
    liveUpdate: false,
    getPrioritiesMessage: null,
    getPrioritiesError: null
  }),
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
    onLegendChange(id) {
      this.$store.commit('mapbox/SET_LEGEND_LAYER', this.legendLayerId === id ? null : id);
    },
    updatePriorities(updateData) {
      this.$store.commit('priorities/UPDATE_PRIORITIES', updateData);
      if(this.liveUpdate) {
        this.calculatePrioritiesMap();
      }
    },
    calculatePrioritiesMap: debounce(function() {
      this.getPrioritiesMessage = 'Calculating the priorities layer';
      this.getPrioritiesError = null;
      wps({
        functionId: 'ra2ce_calc_ratio',
        uid: '1234',
        json_matrix: { values: this.prioritiesMatrix },
      })
      .then(() => {
        this.getPrioritiesMessage = null;
        this.$store.commit('mapbox/REMOVE_WMS_LAYER', priorities.id);
        this.$store.commit('mapbox/ADD_WMS_LAYER', priorities);
      })
      .catch(() => {
        this.getPrioritiesMessage = null;
        this.getPrioritiesError = 'Error Calculating the priorities layer, please retry';
      });
    }, 300),
    restart() {
      this.$store.commit('priorities/RESET_PRIORITIES');
      this.calculatePrioritiesMap();
    }
  }
};
</script>
