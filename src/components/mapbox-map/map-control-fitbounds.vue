<template>
  <button
    class="fitbounds-control mapboxgl-ctrl"
    @click="fitToBounds"
    ref="$control"
    v-show="showControl"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        d="M0 0h24v24H0z"
        fill="none"
      />
      <path
        d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm-7 7H3v4c0 1.1.9 2 2 2h4v-2H5v-4zM5 5h4V3H5c-1.1 0-2 .9-2 2v4h2V5zm14-2h-4v2h4v4h2V5c0-1.1-.9-2-2-2zm0 16h-4v2h4c1.1 0 2-.9 2-2v-4h-2v4z"
      />
    </svg>
  </button>
</template>

<script>
export default {
  inject: ['getMap'],
  props: {
    fitToBounds: {
      type: Function,
      required: true
    },
    position: {
      type: String,
      required: false
    }
  },
  data: () => ({
    showControl: false
  }),
  mounted() {
    const map = this.getMap();
    // If we are already loaded
    if(map && map.loaded()) {
      this.addToMap(map);
    }
  },
  methods: {
    deferredMountedTo(map) {
      this.addToMap(map);
    },
    addToMap(map) {
      const { $control } = this.$refs;
      const control = new MapControlFitbounds($control);
      map.addControl(control, this.position);
      this.showControl = true;
    }
  }
};
class MapControlFitbounds {
  constructor($element) {
    this._container = $element;
  }
  onAdd() {
    return this._container;
  }
  onRemove() {
    this._container.parentNode.removeChild(this._container);
  }
}
</script>

<style>
  .fitbounds-control {
    width: 30px;
    height: 30px;
    padding: 3px;
    background-color: white;
    outline: 0;
    border: 0;
    border-radius: 4px;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  }
  .fitbounds-control:hover {
    background-color: #f2f2f2; /* #ffffff + rgba(0, 0, 0, 0.05) */
  }
 </style>
