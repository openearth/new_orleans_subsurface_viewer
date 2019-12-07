<template>
  <v-card
    class="feature-details"
    min-width="320"
    max-height="800"
  >
    <v-toolbar dense flat>
      <v-toolbar-title>
        {{ feature.uid }}
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
        v-if="featureDetails.length"
        class="d-flex"
      >

        <!-- HTML Plots -->
        <template v-if="htmlPlots.length">
          <div
            v-for="plot in htmlPlots"
            :key="plot.url"
            class="feature-details__column"
          >
            <iframe
              class="feature-details__iframe"
              :src="plot.url"
            />
          </div>
        </template>

        <!-- Images -->
        <template v-if="images.length">
          <div
            v-for="img in images"
            :key="img.url"
            class="feature-details__column"
          >
            <img :src="img.url" :alt="img.name" />
          </div>
        </template>

        <!-- Downloadable documents -->
        <div
          v-if="hasLoaded && textDocuments.length"
          class="feature-details__column"
        >
          <v-list rounded>
            <v-subheader>Documents</v-subheader>
            <v-list-item-group color="primary">
              <v-list-item
                v-for="(item, i) in textDocuments"
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
        </div>

      </div>
      <p v-else-if="!hasLoaded">Loading feature data...</p>
      <p v-else>No data available for this feature</p>

    </v-container>
    <!-- <div style="font-size: 12px;">
      <pre>{{ featureDetails }}</pre>
      <pre>{{ images }}</pre>
    </div> -->
  </v-card>
</template>

<script>
import { compose, split, last, equals, trim } from 'ramda';
import featureDetailsRepo from '@/repo/feature-details.repo';

export default {
  props: {
    feature: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    featureDetails: [],
    hasLoaded: false,
    wpsDictionary: {
      'shallow_wells': 'borehole_data',
      'cross_sections': 'lines_data'
    }
  }),

  computed: {
    htmlPlots() {
      return this.featureDetails.filter(({ url }) => hasExtension('html')(url));
      // For testing :: return [ { url: 'FAKE_DATA/plot_1575300895.767069.html' } ];
    },
    images() {
      return this.featureDetails.filter(({url}) => hasExtension('png')(url));
      // For testing :: return [ { url: 'https://cataas.com/cat/says/Oh%20hi%20Lilia!' } ];
    },
    textDocuments() {
      return this.featureDetails.filter(({ url }) => hasExtension('pdf')(url));
    }
  },

  methods: {
    closeFeature() {
      this.$store.commit('mapbox/SET_ACTIVE_FEATURE', null);
    },

    async fetchDetails() {
      const { uid, layerId } = this.feature;
      const wpsIdentifier = this.wpsDictionary[layerId];

      try {
        this.featureDetails = await featureDetailsRepo.getReport(wpsIdentifier, uid);
        this.hasLoaded = true;
      }
      catch(err) {
        console.error('Error getting feature XML: ', err);
      }
    }
  },

  created() {
    this.fetchDetails();
  },

  watch: {
    feature() {
      this.fetchDetails();
    }
  }
};

const hasExtension = extension =>
  compose(
    equals(extension), // @REFACTOR :: do regexps
    trim,
    last,
    split('.')
  );
</script>

<style>
  .feature-details {
    position: absolute;
    bottom: 2rem;
    left: .5rem;
  }

  .feature-details__column img {
    display: block;
  }

  .feature-details__column:not(:last-child) {
    margin-right: 12px;
  }

  .feature-details__iframe {
    display: block;
    border: 0;
    width: 258px;
    height: 508px;
  }
</style>
