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
      <div>Main view</div>
    </v-content>

    <welcome-dialog />

  </v-app>
</template>

<script>
import Sidebar from './sidebar';
import WelcomeDialog from './welcome-dialog';

export default {
  components: {
    Sidebar,
    WelcomeDialog
  }
};
</script>

<style src="@/assets/css/index.css"></style>
