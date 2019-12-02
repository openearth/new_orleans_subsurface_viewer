<template>
  <v-card
    v-if="!!activeFeature"
    class="feature-details"
    min-width="320"
  >
    <v-toolbar dense flat>
      <v-toolbar-title>Title</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        @click="closeFeature"
        icon
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>

    <v-card-title>
      a
    </v-card-title>
    <v-card-text class="feature-details__text">
      <pre>{{ activeFeature }}</pre>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  computed: {
    activeFeature() {
      return this.$store.getters['mapbox/activeFeature'];
    }
  },

  methods: {
    closeFeature() {
      this.$store.commit('mapbox/SET_ACTIVE_FEATURE', null);
    }
  }
};
</script>

<style>
  .feature-details {
    position: absolute;
    bottom: 2rem;
    left: .5rem;
  }

  .feature-details__text {
    font-size: 12px;
    line-height: 1.5em;
  }
</style>
