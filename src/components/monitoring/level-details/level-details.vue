<template>
    <div class="level-details">
      <v-select
        v-if="activeLocation"
        v-model="internalActiveLevelId"
        label="Select filter for this well"
        :items="levels"
      />
  
      <v-divider v-if="activeLevel" class="my-8" />
  
      <h3 v-if="activeLevel" class="level-details__title text-h6">
        Details well {{ id }}
      </h3>
  
      <v-simple-table v-if="activeLevel">
        <template v-slot:default>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{{ id }}</td>
            </tr>
            <tr v-if="filterTop">
              <td>Top of filter (feet + NAVD88)</td>
              <td>{{ filterTop.toFixed(2) }}</td>
            </tr>
            <tr v-if="filterBottom">
              <td>Bottom of filter (feet + NAVD88)</td>
              <td>{{ filterBottom.toFixed(2) }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
  
      <v-divider v-if="activeLevel" class="my-8" />
  
      <h3 v-if="activeLevel" class="level-details__title text-h6">
        Details well observations {{ id }}
      </h3>
  
      <v-simple-table v-if="activeLevel">
        <template v-slot:default>
          <tbody>
            <tr>
              <td>Min ground water stage (feet + NAVD88)</td>
              <td>{{ min.toFixed(2) }}</td>
            </tr>
            <tr>
              <td>Max ground water stage (feet + NAVD88)</td>
              <td>{{ max.toFixed(2) }}</td>
            </tr>
            <tr>
              <td>Average ground waterstage (feet + NAVD88)</td>
              <td>{{ mean.toFixed(2) }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
  
    </div>
  </template>
  
  <script>
    export default {
        props: {
            activeLevelId: {
                type: String,
            },
            activeLevel: {
                type: Object,
            },
            timeseries: {
                type: Object,
            },
            activeLocation: {
                type: Object,
            },
            levels: {
                type: Array,
            }
        },
      computed: {
        internalActiveLevelId: {
            get() {
                return this.activeLevelId;
            },
            set(id) {
                this.$emit('change-level', {id});
            }
        },
        filterTop() {
          return this.activeLevel.properties.top_filter;
        },
        filterBottom() {
          return this.activeLevel.properties.bot_filter;
        },
        id() {
          return this.activeLevel.properties.locationid;
        },
        max() {
          return Number(this.activeLevel.statistics.maxgw);
        },
        mean() {
          return Number(this.activeLevel.statistics.meangw);
        },
        min() {
          return Number(this.activeLevel.statistics.mingw);
        },
      },
    };
  </script>
  
  <style src="./level-details.css"></style>