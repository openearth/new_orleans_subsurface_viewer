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
      <wpsResponse
        v-if="!!requestData"
        :feature="showPopup"
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
import wpsResponse from '@/components/transect-popup';

export default {
  components: {
    Sidebar,
    MapboxMap,
    WelcomeDialog,
    FeatureDetails,
    wpsResponse
  },

  computed: {
    activeFeature() {
      return this.$store.getters['mapbox/activeFeature'];
    },
    requestData() {
      return this.$store.getters['mapbox/requestData'];
    },
    showPopup() {
      return this.$store.getters['mapbox/showPopup'];
    }
  }
};
</script>

<style src="@/assets/css/index.css"></style>
