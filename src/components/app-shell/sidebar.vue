<template>
  <v-navigation-drawer
    clipped
    app
    permanent
    width="360"
  >
    <v-row dense>
      <v-col :cols="12">
        <router-view />
      </v-col>
    </v-row>
  </v-navigation-drawer>
</template>
