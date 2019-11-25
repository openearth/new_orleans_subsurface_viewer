<template>
  <div class="layer-legend">
    <img
      :src="legendUrl"
      class="layer-legend__image"
      alt="risk legend"
    >
  </div>
</template>

<script>
import legends from '@/lib/project-legends';
export default {
  props: {
    riskId: {
      type: String,
      required: true
    }
  },
  computed: {
    legendUrl() {
      return legends.find(({ id }) => id === this.riskId).url;
    }
  }
};
</script>

<style>
  .layer-legend {
    position: absolute;
    width: 175px;
    bottom: 2rem;
    left: .5rem;
    background-color: white;
    outline: 0;
    border: 0;
    border-radius: 4px;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
    z-index: 1;
  }
  .layer-legend__image {
    border-radius: 4px;
  }
</style>
