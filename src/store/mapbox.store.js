export default {
  namespaced: true,

  state: {
    geoJsonLayers: [],
    rasterLayers: [],
    activeFeature: null,
    requestData:null,
    legendLayer: null,
  },

  getters: {
    geoJsonLayers: state => state.geoJsonLayers,
    rasterLayers: state => state.rasterLayers,
    activeFeature: state => state.activeFeature,
    requestData: state => state.requestData,
    legendLayer: state => state.legendLayer
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
    //change this state when Get Section button is pressed from GeoModel tab
    SET_REQUEST_DATA(state, requestData) {
      state.requestData = requestData;
    },

    SET_LEGEND_LAYER(state,layer) {
      state.legendLayer = layer;
    },

    RESET_ALL(state) {
      state.geoJsonLayers = [];
      state.rasterLayers = [];
      state.activeFeature = null;
      state.requestData = null;
      state.legendLayer = null;
    },


  },

  actions: {

  }
};
