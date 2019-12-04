<template>
  <v-navigation-drawer
    clipped
    app
    permanent
    width="360"
  >
    <v-tabs
      center-active
      background-color="primary"
      dark
      show-arrows
    >
      <v-tab :to="{ name: 'geology' }">
        Geology
      </v-tab>
      <v-tab :to="{ name: 'model' }">
        Model
      </v-tab>
      <v-tab :to="{ name: 'data' }">
        Data
      </v-tab>
      <v-tab :to="{ name: 'monitoring' }">
        Monitoring
      </v-tab>
      <v-tab :to="{ name: 'subsidence' }">
        Subsidence
      </v-tab>
    </v-tabs>
    <v-row dense>
      <v-col :cols="12">
        <router-view />
      </v-col>
    </v-row>
  </v-navigation-drawer>
</template>
