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

      <welcome-dialog />

      <v-tabs
        background-color="primary"
        dark
        right
        style="width: auto;"
        v-model="selectedTab"
      >
        <v-tab key="first"  href="#/intro" :to="{ name: 'intro' }" >
          Introduction
        </v-tab>
        <v-tab :to="{ name: 'geology' }">
          Geology
        </v-tab>
        <v-tab :to="{ name: 'subsurface' }">
          Subsurface
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
        <v-tab :to="{ name: 'salinisation' }">
          Salinisation
        </v-tab>
        <v-tab :to="{ name: 'green' }">
          Green Infra
        </v-tab>
        <v-tab :to="{ name: 'model' }">
          Model
        </v-tab>
      </v-tabs>
    </v-app-bar>

    <v-content>
      <risk-legend
        v-if="legendLayer"
        :legendLayer="legendLayer"
      />
      <mapbox-map />
      <feature-details
        v-if="!!activeFeature"
        :feature="activeFeature"
      />
      <requestData
        v-if="!!requestData"
        :feature="requestData"
      />
    </v-content>



  </v-app>
</template>

<script>
import Sidebar from './sidebar';
import MapboxMap from '@/components/mapbox-map';
import WelcomeDialog from './welcome-dialog';
import FeatureDetails from '@/components/feature-details';
import requestData from '@/components/transect-popup';
import RiskLegend from '@/components/legend';

export default {
  data: () => ({
    selectedTab:false
  }),


  components: {
    Sidebar,
    MapboxMap,
    WelcomeDialog,
    FeatureDetails,
    requestData,
    RiskLegend

  },

  computed: {
    activeFeature() {
      return this.$store.getters['mapbox/activeFeature'];
    },
    requestData() {
      return this.$store.getters['mapbox/requestData'];
    },
     legendLayer() {
      return this.$store.getters['mapbox/legendLayer'];
    }
  },

  mounted () {
    this.selectedTab = "first";
  }
};
</script>

<style src="@/assets/css/index.css"></style>
