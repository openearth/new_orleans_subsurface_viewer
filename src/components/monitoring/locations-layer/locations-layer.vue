<script>

  import Mapbox from 'mapbox-gl';
  import { featureCollection } from '@turf/helpers';
  import bbox from '@turf/bbox';

  // Docs: https://docs.mapbox.com/help/glossary/layout-paint-property/

  const SELECTED_MARKER_STYLES = {
    'circle-color': '#fff',
    'circle-radius': 5,
    'circle-stroke-width': 5,
    'circle-stroke-color': '#ff0000',
  };

  export default {
    name: 'locations-layer',
    props: {
      locations: {
        type: Array,
      },
      activeLocation: {
        type: Object,
      }
    },
    render() {
      return this.$slots.default;
    },
    data() {
      return {
        map: null,
        popup: null,
      };
    },
    destroyed() {
      this.$root.map.removeLayer('monitoring-locations');
      this.$root.map.removeSource('monitoring-locations');
      this.$root.map.removeLayer('selected-location');
      this.$root.map.removeSource('selected-location');
    },
    created() {
      this.$root.mapbox = Mapbox;
      this.popup = new Mapbox.Popup({
        closeButton: false,
        closeOnClick: false,
        offset: 14,
      });

      if(this.$root.mapLoaded) {
        this.addListeners();
        this.populateMap();
      } else {
        this.$root.$on('map-loaded', () => {
          this.addListeners();
          this.populateMap();
        });
      }
    },
    methods: {
      addListeners() {
        this.$root.map.on('click', 'monitoring-locations', this.onClickMarker);
        this.$root.map.on('mouseenter', 'monitoring-locations', this.onMouseEnter);
        this.$root.map.on('mouseleave', 'monitoring-locations', this.onMouseLeave);
      },
      addLocationToMap() {
        const activeLocationFeature = featureCollection([ {
          type: 'Feature',
          geometry: this.activeLocation.geometry,
          properties: this.activeLocation.properties,
        } ]);

        this.$root.map
          .getSource('selected-location')
          .setData(activeLocationFeature);
      },
      createLocationsSource() {
        this.$root.map.addSource('monitoring-locations', {
          type: 'geojson',
          data: featureCollection(
            this.locations.map((location) => ({
              geometry: location.geometry,
              properties: location.properties,
              type: 'Feature',
            }))
          ),
        });

        this.$root.map.addLayer({
          id: 'monitoring-locations',
          type: 'circle',
          source: 'monitoring-locations',
          paint: {
            'circle-radius': 5,
            'circle-color': '#fff',
            'circle-stroke-width': 5,
            'circle-stroke-color': [
              'match',
              ['get', 'type_well'],
              'GWM', '#96613d',
              'SWM', '#008fc5',
              '#000000'
            ]
          },
        });
      },
      createSelectedLocationSource() {
        this.$root.map.addSource('selected-location', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [],
          },
        });

        this.$root.map.addLayer({
          id: 'selected-location',
          type: 'circle',
          source: 'selected-location',
          paint: SELECTED_MARKER_STYLES,
        });
      },
      onClickMarker(event) {
        const { loc_id } = event.features[0].properties;

        this.$emit('click-marker', {id: loc_id});
      },
      onMouseEnter(event) {
        const { features, lngLat } = event;
        const coordinates = features[0].geometry.coordinates.slice();
        console.log('features[0].properties', features[0].properties);
        const { long_name } = features[0].properties;
        const content = `<dl>
          <dt class="text-subtitle-2">Location name:</dt>
          <dd class="text-body-2">${ long_name }</dd>
        </dl>`;

        // Change the cursor style as a UI indicator.
        this.$root.map.getCanvas().style.cursor = 'pointer';

        // Ensure that if the map is zoomed out such that multiple copies of the
        // feature are visible, the popup appears over the copy being pointed to.
        while (Math.abs(lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // Populate the popup and set its coordinates based on the feature found.
        this.popup
          .setLngLat(coordinates)
          .setHTML(content)
          .addTo(this.$root.map);
      },
      onMouseLeave() {
        this.$root.map.getCanvas().style.cursor = '';
        this.popup.remove();
      },
      populateMap() {
        this.createLocationsSource();
        this.createSelectedLocationSource();
      },
      removeListeners() {
        this.$root.map.off('click', 'monitoring-locations', this.onClickMarker);
        this.$root.map.off('mouseenter', 'monitoring-locations', this.onMouseEnter);
        this.$root.map.off('mouseleave', 'monitoring-locations', this.onMouseLeave);
      },
      zoomToCollection({ padding }) {
        if (!this.locations.length) {
          return;
        }

        const bounds = bbox(featureCollection(
          this.locations.map(({ geometry }) => ({
            type: 'Feature', geometry,
          }))
        ));

        this.$root.map.fitBounds(bounds, { padding });
      },
    },
    watch: {
      panelIsCollapsed(isCollapsed) {
        if (isCollapsed) {
          this.zoomToCollection({ padding: 150 });
        } else {
          const height = this.$root.$el.offsetHeight - 64;
          const bottomOffset = parseInt(height * 0.66, 10);

          this.zoomToCollection({ padding: { top: 50, bottom: bottomOffset, left: 50, right: 50 } });
        }
      },
      activeLocation(location) {
        if (location) {
          this.addLocationToMap(location);
        }
      },
    },
  };
</script>