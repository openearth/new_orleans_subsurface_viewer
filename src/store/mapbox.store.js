export default {
  namespaced: true,

  state: {
    geoJsonLayers: [],
    rasterLayers: [],
    activeFeature: null,
    section: null
  },

  getters: {
    geoJsonLayers: state => state.geoJsonLayers,
    rasterLayers: state => state.rasterLayers,
    activeFeature: state => state.activeFeature,
    section: state => state.section,
  },

  mutations: {
    ADD_GEOJSON_LAYER(state, newLayer) {
      const layerExists = state.geoJsonLayers.some(storedLayer => storedLayer.id === newLayer.id);
      if(!layerExists) {
        state.geoJsonLayers = [
          ...state.geoJsonLayers, Object.freeze({
            ...newLayer
          })
        ];
      }
    },
    REMOVE_GEOJSON_LAYER(state, id) {
      state.geoJsonLayers = state.geoJsonLayers.filter(layer => layer.id !== id);
    },
    ADD_RASTER_LAYER(state, newLayer) {
      const layerExists = state.rasterLayers.some(storedLayer => storedLayer.id === newLayer.id);
      if(!layerExists) {
        state.rasterLayers = [
          ...state.rasterLayers, Object.freeze({
            ...newLayer
          })
        ];
      }
    },
    REMOVE_RASTER_LAYER(state, id) {
      state.rasterLayers = state.rasterLayers.filter(layer => layer.id !== id);
    },
    SET_ACTIVE_FEATURE(state, feature) {
      state.activeFeature = Object.freeze(feature);
    },
    SET_GET_SECTION(state, section) {
      state.section = Object.freeze(section);
    },
    RESET_ALL(state) {
      state.geoJsonLayers = [];
      state.rasterLayers = [];
      state.activeFeature = null;
      state.section = null;
    }
  },

  actions: {

  }
};
