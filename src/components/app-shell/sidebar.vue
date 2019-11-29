
<template>
  <v-navigation-drawer clipped app permanent class="pa-2" width="450">
    <v-row dense class="fill-height">
      <v-col :cols="12" class="fill-height pa-4">
        <router-view />
      </v-col>
    </v-row>
  </v-navigation-drawer>
</template>
