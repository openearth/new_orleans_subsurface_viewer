<template>
  <v-app>
    <sidebar />

    <v-app-bar
      class="app-header"
      app
      color="primary"
      dark
    >
      <v-toolbar-title>
        NO2SV
      </v-toolbar-title>
      <v-tabs
        background-color="primary"
        dark
        right
        style="width: auto;"
      >
        <v-tab :to="{ name: 'geology' }">
          Geology
        </v-tab>
        <v-tab :to="{ name: 'model' }">
          Geo-Model
        </v-tab>
        <v-tab :to="{ name: 'data' }">
          Data & Maps
        </v-tab>
        <v-tab :to="{ name: 'monitoring' }">
          Monitoring
        </v-tab>
        <v-tab :to="{ name: 'subsidence' }">
          Subsidence
        </v-tab>
      </v-tabs>
    </v-app-bar>

    <v-content>
      <mapbox-map />
      <feature-details
        v-if="!!activeFeature"
        :feature="activeFeature"
      />
      <transect-popup
        v-if="seen"
        :feature="section"
      />
    </v-content>

    <welcome-dialog />

  </v-app>
</template>

<script>
import Sidebar from './sidebar';
import MapboxMap from '@/components/mapbox-map';
import WelcomeDialog from './welcome-dialog';
import FeatureDetails from '@/components/feature-details';

export default {
  components: {
    Sidebar,
    MapboxMap,
    WelcomeDialog,
    FeatureDetails,
  },

  computed: {
    activeFeature() {
      return this.$store.getters['mapbox/activeFeature'];
    },
    section() {
      return this.$store.getters['mapbox/section'];
    }
  }
};
</script>

<style src="@/assets/css/index.css"></style>
