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
      <v-spacer/>
    </v-app-bar>

    <v-content>
      <mapbox-map />
      <feature-details
        v-if="!!activeFeature"
        :feature="activeFeature"
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
    FeatureDetails
  },

  computed: {
    activeFeature() {
      return this.$store.getters['mapbox/activeFeature'];
    }
  }
};
</script>

<style src="@/assets/css/index.css"></style>
