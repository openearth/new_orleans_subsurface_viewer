export default {
  name: 'map-layer',
  inject: ['getMap'],
  render() {
    return null;
  },

  props: {
    options: {
      default: () => ({}),
      type: [Object, String]
    },
    // allows to place a layer before another
    before: {
      type: String,
      default: null
    },
    clickable: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    isInitialized: false
  }),

  methods: {
    deferredMountedTo() {
      if(!this.isInitialized) {
        this.renderLayer();
        this.isInitialized = true;
      }
    },

    addLayer() {
      const map = this.getMap();
      map.addLayer(this.options, this.before);

      if(this.clickable) {
        const layerId = this.options.id;

        map.on('click', layerId, e => {
          this.$emit('click', e);
        });

        map.on('mouseenter', layerId, () => {
          map.getCanvas().style.cursor = 'pointer';
        });

        map.on('mouseleave', layerId, () => {
          map.getCanvas().style.cursor = '';
        });
      }
    },

    removeLayer() {
      const map = this.getMap();
      if(map) {
        const layer = map.getLayer(this.options.id);
        if(layer) {
          map.removeLayer(this.options.id);
          map.removeSource(layer.source);
        }
      }
    },

    renderLayer() {
      this.removeLayer();
      this.addLayer();
    }
  },

  mounted() {
    const map = this.getMap();
    // We can immediately initialize if we have the map ready
    if(map && map.isStyleLoaded()) {
      this.renderLayer();
      this.isInitialized = true;
    }
  },

  destroyed() {
    this.removeLayer();
  },

  watch: {
    options: {
      deep: true,
      handler() {
        this.renderLayer();
      }
    }
  }
};
