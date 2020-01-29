<template>
   <v-card
    class="requestData"
    min-width="600"
    max-height="800"
  >
    <v-toolbar dense flat>
      <v-toolbar-title>
        {{ "Transect plot"}}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        @click="closeFeature"
        icon
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>

    <v-container>

      <div
        v-if="requestData.length"
        class="d-flex"
      >

        <!-- HTML Plots -->
        <template v-if="htmlPlots.length">
          <div
            v-for="plot in htmlPlots"
            :key="plot.url"
            class="requestData__column"
          >
            <iframe
              class="requestData__iframe"
              :src="plot.url"
            />
          </div>
        </template>

      </div>
      <p v-else-if="!hasLoaded">Loading feature data...</p>
      <p v-else>No data available for this feature</p>

    </v-container>
  </v-card>
</template>

<script>
import { compose, split, last, equals, trim } from 'ramda';

export default {

  data:() => ({
    hasLoaded:false,
  }),

  computed: {
    htmlPlots(){
      return this.requestData.filter(({url}) => hasExtension ('html')(url));
    },

    requestData () {
      return this.$store.getters['mapbox/requestData'];
    }
  },

  methods:{
    closeFeature() {
      this.$store.commit('mapbox/SET_REQUEST_DATA', null);
    },

    async getSection() {
      try {
        this.hasLoaded = true;

      }      catch(err) {
        console.error('Error getting transect: ', err);
      }
    },
  },

  created() {
    this.getSection();
  }

};
const hasExtension = extension =>
compose(
  equals(extension),
  trim,
  last,
  split('.')
);

</script>
<style>
  .requestData{
    position: absolute;
    bottom: 2rem;
    left: .5rem;
  }

  .requestData__column img {
    display: block;
  }

  .requestData__column:not(:last-child) {
    margin-right: 12px;
  }

  .requestData__iframe {
    display: block;
    border: 0;
    width: 600px;
    height: 530px;
  }
</style>
