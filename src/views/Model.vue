<template>
  <div>
    <v-card-title>
      Geo-Model
    </v-card-title>
    <v-sheet class="pa-5">
      <v-btn
        @click="toggleDrawLine"
        :disabled="isDrawing"
        class="mr-4"
      >
        {{ hasFullyDrawnLine ? 'Re-d' : 'D' }}raw line
      </v-btn>
      <v-btn
        @click="getSection"
        :disabled="!hasFullyDrawnLine"
      >
        Get section
      </v-btn>
      <pre>{{ linestring }}</pre>
    </v-sheet>
  </div>
</template>

<script>
import transectRepo from '@/repo/transect.repo';

const DELTARES_BLUE = '#008fc5';
const SOURCE_NAME = 'draw-geojson';
const POINTS_LAYER_ID = 'draw-points';
const LINES_LAYER_ID = 'draw-lines';
const MAX_POINTS = 2;

export default {
  data: () => ({
    seen:true,
    geojson: {
      'type': 'FeatureCollection',
      'features': []
    },
    linestring: {
      'type': 'Feature',
      'geometry': {
        'type': 'LineString',
        'coordinates': []
      }
    },
    isDrawing: false,
    pointToDragId: null
  }),

  computed: {
    hasFullyDrawnLine() {
      return this.geojson.features.length > MAX_POINTS;
    }
  },

  methods: {
    async getSection() {
      console.log('Getting section');

      try {
        await transectRepo.getTransect(this.linestring.geometry.coordinates);
        // console.log(transectRepo)
      }
      catch(err) {
        console.error('Error getting transect: ', err);
      }
    },

    buildLine() {
      this.linestring.geometry.coordinates = this.geojson.features
        .map(point => point.geometry.coordinates);

      this.geojson.features.push(this.linestring);
    },

    clickFn_draw(e) {
      const map = this.$root.map;
      const features = map.queryRenderedFeatures(e.point, { layers: [POINTS_LAYER_ID] });

      // Remove the linestring from the group
      // So we can redraw it based on the points collection
      // (linestring is always the last element)
      if(this.geojson.features.length > 1) this.geojson.features.pop();

      // If a feature was clicked, remove it from the map
      if(features.length) {
        const id = features[0].properties.id;
        this.geojson.features = this.geojson.features.filter(point =>
          point.properties.id !== id
        );
      // Otherwise we add a point
      }
      else {
        const point = {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [
              e.lngLat.lng,
              e.lngLat.lat
            ]
          },
          "properties": {
            "id": String(new Date().getTime())
          }
        };
        this.geojson.features.push(point);
      }

      // Build the line
      if(this.geojson.features.length > 1) {
        this.buildLine();
      }

      map.getSource(SOURCE_NAME).setData(this.geojson);

      // If we reach the maximum amount of points, stop drawing
      if(this.hasFullyDrawnLine) {
        this.cleanListeners_draw();
        this.isDrawing = false;
        this.initAdjustLine();
      }
    },

    mouseMoveFn_draw(e) {
      const map = this.$root.map;
      const features = map.queryRenderedFeatures(e.point, { layers: [POINTS_LAYER_ID] });
      // UI indicator for clicking/hovering a point on the map
      map.getCanvas().style.cursor = features.length ? 'pointer' : 'crosshair';
    },

    mouseDragFn_adjust(e) {
      const map = this.$root.map;
      const coords = e.lngLat;

      // Set a UI indicator for dragging.
      map.getCanvas().style.cursor = 'grabbing';

      // Remove line from stored features
      this.geojson.features.pop();

      // Update the point feature in `geojson` coordinates
      this.geojson.features
        .find(feature => feature.properties.id === this.pointToDragId)
        .geometry.coordinates = [ coords.lng, coords.lat ]
      ;

      // Build the line
      this.buildLine();

      // Re-draw the features on the map
      map.getSource(SOURCE_NAME).setData(this.geojson);
    },

    mouseDownFn_adjust(e) {
        e.preventDefault();
        const map = this.$root.map;
        map.getCanvas().style.cursor = 'grab';

        this.pointToDragId = e.features[0].properties.id;
        map.on('mousemove', this.mouseDragFn_adjust);
        map.once('mouseup', this.mouseUpFn_adjust);
    },

    mouseUpFn_adjust() {
      const map = this.$root.map;

      map.getCanvas().style.cursor = '';
      map.off('mousemove', this.mouseDragFn_adjust);
      this.pointToDragId = null;
    },

    mouseEnterFn_adjust() {
      const map = this.$root.map;
      map.getCanvas().style.cursor = 'pointer';
    },

    mouseLeaveFn_adjust() {
      const map = this.$root.map;
      map.getCanvas().style.cursor = '';
    },

    toggleDrawLine() {
      if(!this.isDrawing) {
        this.initDrawLine();
        this.isDrawing = true;
      }
    },

    initDrawLine() {
      const map = this.$root.map;

      this.cleanListeners_adjust();
      this.removeDrawing();

      map.addSource(SOURCE_NAME, {
        'type': 'geojson',
        'data': this.geojson
      });

      map.addLayer({
        id: POINTS_LAYER_ID,
        type: 'circle',
        source: SOURCE_NAME,
        paint: {
          'circle-radius': 6,
          'circle-color': DELTARES_BLUE
        },
        filter: ['in', '$type', 'Point']
      });

      map.addLayer({
        id: LINES_LAYER_ID,
        type: 'line',
        source: SOURCE_NAME,
        layout: {
          'line-cap': 'round',
          'line-join': 'round'
        },
        paint: {
          'line-color': DELTARES_BLUE,
          'line-width': 2.5
        },
        filter: ['in', '$type', 'LineString']
      });

      map.on('click', this.clickFn_draw);
      map.on('mousemove', this.mouseMoveFn_draw);
    },

    initAdjustLine() {
      const map = this.$root.map;
      map.on('mouseenter', POINTS_LAYER_ID, this.mouseEnterFn_adjust);
      map.on('mouseleave', POINTS_LAYER_ID, this.mouseLeaveFn_adjust);
      map.on('mousedown', POINTS_LAYER_ID, this.mouseDownFn_adjust);
    },

    cleanListeners_draw() {
      const map = this.$root.map;
      map.off('click', this.clickFn_draw);
      map.off('mousemove', this.mouseMoveFn_draw);
      map.getCanvas().style.cursor = '';
    },

    cleanListeners_adjust() {
      const map = this.$root.map;
      map.off('mouseenter', POINTS_LAYER_ID, this.mouseEnterFn_adjust);
      map.off('mouseleave', POINTS_LAYER_ID, this.mouseLeaveFn_adjust);
      map.off('mousedown', POINTS_LAYER_ID, this.mouseDownFn_adjust);
    },

    removeDrawing() {
      this.geojson.features = [];
      this.linestring.geometry.coordinates = [];

      const map = this.$root.map;
      if(map.getLayer(POINTS_LAYER_ID)) map.removeLayer(POINTS_LAYER_ID);
      if(map.getLayer(LINES_LAYER_ID)) map.removeLayer(LINES_LAYER_ID);
      if(map.getSource(SOURCE_NAME)) map.removeSource(SOURCE_NAME);
    },
  },

  destroyed() {
    this.cleanListeners_draw();
    this.cleanListeners_adjust();
    this.removeDrawing();
  }
};
</script>
