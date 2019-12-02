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
    </v-content>

    <welcome-dialog />

  </v-app>
</template>

<script>
import Sidebar from './sidebar';
import WelcomeDialog from './welcome-dialog';
import MapboxMap from '@/components/mapbox-map';

export default {
  components: {
    Sidebar,
    WelcomeDialog,
    MapboxMap
  }
};
</script>

<style src="@/assets/css/index.css"></style>
