export default {
  namespaced: true,

  state: {
    geoJsonLayers: [],
    activeFeature: null
  },

  getters: {
    geoJsonLayers: state => state.geoJsonLayers,
    activeFeature: state => state.activeFeature
  },

  mutations: {
    ADD_GEOJSON_LAYER(state, newLayer) {
      const layerExists = state.geoJsonLayers.some(storedLayer => storedLayer.id === newLayer.id);
      if(!layerExists) {
        state.geoJsonLayers = [
          ...state.geoJsonLayers, {
            ...newLayer
          }
        ];
      }
    },
    REMOVE_GEOJSON_LAYER(state, id) {
      state.geoJsonLayers = state.geoJsonLayers.filter(layer => layer.id !== id);
    },
    SET_ACTIVE_FEATURE(state, feature) {
      state.activeFeature = feature;
    }
  },

  actions: {

  }
};
