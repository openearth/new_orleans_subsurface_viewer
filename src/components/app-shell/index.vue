<template>
  <v-app>
    <sidebar />

    <v-app-bar
      class="app-header"
      app
      color="indigo"
      dark
    >
      <v-toolbar-title>
        NO2SV
      </v-toolbar-title>
      <v-spacer/>
    </v-app-bar>

    <v-content>
        <risk-legend
        v-if="legendLayerId"
        :risk-id="legendLayerId"
      />
      <mapbox-map />
    </v-content>

    <welcome-dialog />

  </v-app>
</template>

<script>
import Sidebar from './sidebar';
import WelcomeDialog from './welcome-dialog';
import MapboxMap from '@/components/mapbox-map';
import RiskLegend from '@/components/risk-legend';

export default {
  components: {
    Sidebar,
    WelcomeDialog,
    MapboxMap,
    RiskLegend
  },
    computed: {
    legendLayerId() {
      return this.$store.getters['mapbox/legendLayerId'];
    }
  }
};
</script>

<style src="@/assets/css/index.css"></style>
