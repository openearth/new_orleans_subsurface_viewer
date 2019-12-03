<template>
  <v-card
    class="feature-details"
    min-width="320"
    max-height="800"
  >
    <v-toolbar dense flat>
      <v-toolbar-title>
        {{ feature.properties.uid }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        @click="closeFeature"
        icon
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>

    <v-container class="d-flex">

      <!-- Plot -->
      <iframe
        v-if="!!featurePlotUrl"
        class="feature-details__iframe"
        src="FAKE_DATA/plot_1575300895.767069.html"
      />

      <!-- Details -->
      <v-list
        v-if="featureDetails.length"
        rounded
        class="ml-3 feature-details__documents"
      >
        <v-subheader>Documents</v-subheader>
        <v-list-item-group color="primary">
          <v-list-item
            v-for="(item, i) in featureDetails"
            :key="i"
            :href="item.url"
            target="_blank"
            color="primary"
          >
            <v-list-item-icon>
              <v-icon>mdi-file-document</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.name" />
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>

    </v-container>
  </v-card>
</template>

<script>
import getLocalXml from '@/data/get-local-xml';
import { path, partition, compose } from 'ramda';

export default {
  props: {
    feature: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    featurePlotUrl: null,
    featureDetails: []
  }),

  methods: {
    closeFeature() {
      this.$store.commit('mapbox/SET_ACTIVE_FEATURE', null);
    }
  },

  async created() {
    try {
      const response = await getLocalXml('/FAKE_DATA/shallow_well_feature.xml');
      const PLOT_FILE_ID = 'plot_file';

      // Ramda helpers 🐏
      const getDetailUrl = path(['wps:Data', 'wps:ComplexData', '_cdata']);
      const splitPlotUrlFromLinks = partition(obj => path(['ows:Identifier', '_text'], obj) === PLOT_FILE_ID);
      const formatLink = feature => ({
          name: compose(
            str => str.replace('_', ' '),
            path(['ows:Identifier', '_text'])
          )(feature),
          url: getDetailUrl(feature)
      });
      const buildLinks = compose(
        arr => ({ plotUrl: arr[0][0], links: arr[1].map(formatLink) }),
        splitPlotUrlFromLinks,
        path(['wps:ExecuteResponse', 'wps:ProcessOutputs', 'wps:Output'])
      );

      const { plotUrl, links } = buildLinks(response);
      this.featurePlotUrl = plotUrl;
      this.featureDetails = links;
    }
    catch(err) {
      console.log('Error getting feature XML: ', err);
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

  .feature-details__iframe {
    border: 0;
    width: 250px;
    height: 500px;
  }

  .feature-details__documents {
    text-transform: capitalize;
  }
</style>
