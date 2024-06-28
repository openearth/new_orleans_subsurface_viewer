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
            <tr>
              <td>Well depth</td>
              <td>{{ wellDepth }} cm</td>
            </tr>
            <tr>
              <td>Mean highest groundwater level</td>
              <td>{{ highLevel }} cm</td>
            </tr>
            <tr>
              <td>Mean lowest groundwater level</td>
              <td>{{ lowLevel }} cm</td>
            </tr>
            <tr>
              <td>Mean groundwater level</td>
              <td>{{ meanLevel }} cm</td>
            </tr>
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
            return this.activeLocation.properties.z;
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
          return "---";
        },
        lowLevel() {
          if (this.activeLocation.properties.glg) {
            return this.activeLocation.properties.glg;
          }
          return "---";
        },
        meanLevel() {
          if (this.activeLocation.properties.ghg && this.activeLocation.properties.glg) {
            return (this.activeLocation.properties.ghg + this.activeLocation.properties.glg) / 2;
          }
          return "---";
        },
      },
    };
  </script>
  
  <style></style>