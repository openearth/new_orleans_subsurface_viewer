<template>
  <div
    class="monitoring-panel"
    :class="{ 'monitoring-panel--collapsed': panelIsCollapsed }"
  >
    <v-btn
      v-if="!panelIsCollapsed"
      class="monitoring-panel__minimize"
      icon
      title="Minimaliseer"
      @click="onClickCollapse"
    >
      <v-icon>mdi-chevron-down</v-icon>
    </v-btn>

    <div class="details d-flex flex-row">
      <div class="details__column">
        <h3 class="text-h6">
          {{ locLongName }}
        </h3>
        <location-details :active-location="activeLocation" />
        <v-divider class="my-8" />
        <!-- <level-details 
                    :levels="levels"
                    :active-level="activeLevel"
                    :active-level-id="activeLevelId"
                    :active-location="activeLocation"
                    @change-level="onChangeLevel"
                    /> -->
      </div>

      <div class="details__column" style="margin-top: 30px">
        <v-card>
          <v-tabs background-color="primary" center-active dark>
            <v-tab>water level</v-tab>
            <v-tab>geology</v-tab>
            <v-tab>field measurement</v-tab>

            <v-tab-item style="margin: 10px">
              <h3 v-if="!activeLevel" class="text-h6">
                Coming soon <br />
              </h3>
              <h3 v-if="!!activeLevel" class="text-h6">
                Timeseries for {{ id }}
              </h3>
              <area-chart
                v-if="activeLevel"
                :timeseries="activeLevel.timeseries"
                :statistics="activeLevel.statistics"
                :well_type= "activeLevel.well_type"
              />
            </v-tab-item>

            <v-tab-item style="margin: 10px">
              <h3 class="text-h6">Bore log of location {{ name }} <br /></h3>
              <feature-details
                class="graph-borehole-subtab"
                v-if="!!activeFeature"
                :feature="activeFeature"
              />
            </v-tab-item>

            <v-tab-item style="margin: 10px">
              <h3 v-if="!activeLevel" class="text-h6">
                Coming soon <br />
              </h3>
              <h3 v-else class="text-h6">
                Information of {{ id }}
                <br />
                <br />
                <v-card elevation="5">
                  <v-simple-table v-if="activeLocation" class="data-table">
                    <tbody>
                      <tr>
                        <th class="data-table__cell">Date</th>
                        <th
                          class="data-table__cell data-table__cell--align-right"
                        >
                          {{ activeLevel.parameters.parameter }} [{{
                            activeLevel.parameters.unit
                          }}]
                        </th>
                      </tr>
                      <tr v-for="item in tableData" :key="item.date">
                        <td class="data-table__cell">{{ item.date }}</td>
                        <td
                          class="data-table__cell data-table__cell--align-right"
                        >
                          {{ item[activeLevel.parameters.parameter] }}
                        </td>
                      </tr>
                    </tbody>
                  </v-simple-table>
                </v-card>
              </h3>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </div>
    </div>

    <locations-layer
      v-if="locations.length"
      :locations="locations"
      :active-location="activeLocation"
      @click-marker="onClickMarker"
    />
  </div>
</template>

<script>
import AreaChart from "@/components/monitoring/area-chart/area-chart";
// import LevelDetails from '@/components/monitoring/level-details/level-details';
import LocationDetails from "@/components/monitoring/location-details/location-details";
import LocationsLayer from "@/components/monitoring/locations-layer/locations-layer";
import getLocationsData from "@/lib/get-locations-data";
import getLevelData from "@/lib/get-level-data";
import getTableImages from "@/lib/get-table-images";
import FeatureDetails from "@/components/feature-details";

export default {
  components: {
    AreaChart,
    LocationDetails,
    LocationsLayer,
    FeatureDetails,
  },
  data() {
    return {
      tables: [],
      panelIsCollapsed: true,

      locations: [],
      activeLocationId: null,

      activeLevel: null,
      activeLevelId: null,
    };
  },
  created() {
    this.getLocations();
    
  },
  computed: {
    activeLocation() {
      return this.locations.find(
        (location) => location.properties.loc_id === this.activeLocationId
      );
    },
    id() {
      return this.activeLevel.properties.locationid;
    },
    loc_id() {
      if (this.activeLocation && this.activeLocation.properties) {
        return this.activeLocation.properties.loc_id;
      }
      return null;
    },
    name() {
      if (this.activeLocation && this.activeLocation.properties) {
        return this.activeLocation.properties.name;
      }
      return null;
    },
    locLongName() {
      if (this.activeLocation && this.activeLocation.properties) {
        return this.activeLocation.properties.long_name;
      }
      return null;
    },
    tableData() {
      const parameter = this.activeLevel.parameters.parameter;

      const groupedByDate = new Map();

      this.activeLevel.timeseries.forEach(({ date, dateObj, head }) => {
        if (groupedByDate.has(date)) {
          groupedByDate.get(date)[parameter] = head;
          return;
        }

        groupedByDate.set(date, {
          date,
          dateObj,
          [parameter]: head,
        });
      });

      return [...groupedByDate.values()].sort((a, b) => a.dateObj - b.dateObj);
    },

    activeFeature() {
      if (this.activeLocation) {
        const activeFeature = {
          layerId: "boreholes", //TODO remove hard-coded layerId
          uid: this.activeLocation.properties.borelogs_id,
        };
        return activeFeature;
      }
      return null;
    }

  },

  methods: {
    reset() {
      this.activeLevel = null;
    },

    onClickCollapse() {
      this.panelIsCollapsed = true;
    },

    onClickMarker({ id }) {
      this.activeLocationId = id;
      this.panelIsCollapsed = false;
    },

    onChangeLevel({ id }) {
      this.activeLevelId = id;
      this.getLevel({
        id,
      });
      console.log(this.activeLevel.timeseries)
    },

    getLocations() {
      return getLocationsData()
        .then(({ features }) => {
          this.locations = features;
        })
        .catch((err) => Promise.reject(err));
    },

    getLevel({ props }) {
      
      if (props) {
      return getLevelData({ id: props.name, well_type: "Groundwaterlevel"}).then((activeLevel) => {        
        activeLevel.well_type = props.type_well
        this.activeLevel = activeLevel ;
      })}
      return this.activeLevel = null
    },
  },
  watch: {
    activeLocation(location) {
      this.reset();
      if (location) {
        getTableImages({ id: location.properties.loc_id }).then(
          (tables) => (this.tables = tables)
        );
        console.log("location props", location.properties)
        this.getLevel({props:location.properties})
      }
    },
  },
};
</script>

<style>
.monitoring-panel {
  position: fixed;
  z-index: 5;
  bottom: 0;
  left: 0;
  right: 0;
  height: 44vh;
  overflow: hidden;
  transform: translateY(0);
  transition: transform 0.35s cubic-bezier(0.25, 0.8, 0.5, 1);
  background-color: #fff;
  box-shadow: 0 -2px 8px 0px rgba(0, 0, 0, 0.3);
}

.monitoring-panel--collapsed {
  transform: translateY(100%);
}

.monitoring-panel__minimize {
  position: absolute;
  top: 0;
  right: 0;
  margin: 8px;
}

.details {
  gap: 24px;
  height: 100%;
  padding: 24px 0;
  overflow: hidden;
}

.details__column {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 24px;
  overflow: auto;
}

.details__column .text-h6 {
  margin-bottom: 16px;
}

.details__column:first-child {
  flex: 0 0 600px;
}

.details__column:last-child {
  flex: 1 1 auto;
}

.data-table__cell {
  width: 25%;
}

.data-table__cell--align-right {
  text-align: right !important;
}

.graph-borehole-subtab {
  position: static;
}
</style>
