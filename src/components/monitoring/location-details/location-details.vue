<template>
    <div class="location-details">
      <v-simple-table v-if="activeLocation">
        <template v-slot:default>
          <tbody>
            <tr>
              <td>ID</td>
              <td>{{ id }}</td>
            </tr>
            <tr>
              <td>Elevation</td>
              <td>{{ elevation }}</td>
            </tr>
            <template v-if="activeLocation.properties.type_well == 'GWM'">
            <tr>
              <td>Well depth</td>
              <td>{{ wellDepth }} cm</td>
            </tr>
          </template>
          <template v-if="highLevel">
            <tr>
              <td>High level</td>
              <td>{{ highLevel }}</td>
            </tr>
          </template>
          <template v-if="lowLevel">
            <tr>
              <td>Low level</td>
              <td>{{ lowLevel }}</td>
            </tr>
          </template>
          <template v-if="meanLevel">
            <tr>
              <td>Mean level</td>
              <td>{{ meanLevel }}</td>
            </tr>
          </template>

          </tbody>
        </template>
      </v-simple-table>
    </div>
  </template>
  
  <script>
    export default {
        props: {
            activeLocation: {
                type: Object,
            },
        },
      computed: {
        id() {
          if (this.activeLocation.properties.name) {
            return this.activeLocation.properties.name;
          }
          return "---";
        },
        elevation() {
          if (this.activeLocation.properties.z) {
            if (this.activeLocation.properties.type_well == "GWM"){
              return this.activeLocation.properties.z + " m + NAVD88";
            }
            if (this.activeLocation.properties.type_well == "SWM"){
              return this.activeLocation.properties.z + "m + sensor"
            }
          }
          return "---";
        },
        wellDepth() {
          if (this.activeLocation.properties.well_depth) {
            return this.activeLocation.properties.well_depth;
          }
          return "---";
        },
        highLevel() {
          if (this.activeLocation.properties.ghg) {
            return this.activeLocation.properties.ghg;
          }
          return null;
        },
        lowLevel() {
          if (this.activeLocation.properties.glg) {
            return this.activeLocation.properties.glg;
          }
          return null;
        },
        meanLevel() {
          if (this.activeLocation.properties.ghg && this.activeLocation.properties.glg) {
            return (this.activeLocation.properties.ghg + this.activeLocation.properties.glg) / 2;
          }
          return null;
        },
      },
    };
  </script>
  
  <style></style>