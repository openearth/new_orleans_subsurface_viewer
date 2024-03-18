<template>
    <div class="location-details">
      <v-simple-table v-if="activeLocation">
        <template v-slot:default>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{{ id }}</td>
            </tr>
            <tr>
              <td>Coördinates (EPSG:8744)</td>
              <td>x: {{ coordinates_rd[0] }} - y: {{ coordinates_rd[1] }}</td>
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
          return this.activeLocation.properties.loc_id;
        },
        coordinates_rd() {
          return this.activeLocation.geometry_rd.coordinates;
        },
      },
    };
  </script>
  
  <style></style>