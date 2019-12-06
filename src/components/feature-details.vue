<template>
  <v-card
    class="feature-details"
    min-width="320"
    max-height="800"
    v-if="hasData"
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
        v-if="!!featurePlotLink"
        class="feature-details__iframe"
        src="FAKE_DATA/plot_1575300895.767069.html"
      />

      <!-- Details -->
      <v-list
        v-if="featureDetails.length"
        rounded
        class="ml-3"
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

      <!-- <pre>{{ featurePlotLink }}</pre> -->

    </v-container>
  </v-card>
</template>

<script>
import featureDetailsRepo from '@/repo/feature-details.repo';
import { partition } from 'ramda';
const PLOT_FILE_ID = 'plot_file';

export default {
  props: {
    feature: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    featurePlotLink: null,
    featureDetails: [],
    hasData: false
  }),

  methods: {
    closeFeature() {
      this.$store.commit('mapbox/SET_ACTIVE_FEATURE', null);
    },

    async fetchDetails() {
      console.log('fetching');
      const { uid } = this.feature.properties;
      try {
        const detailList = await featureDetailsRepo.getReport(uid);

        // We need to split off the plot to display it in an iFrame
        const [ plotLinks, otherLinks ] = partition(({ id }) => id === PLOT_FILE_ID, detailList);
        this.featurePlotLink = plotLinks[0];
        this.featureDetails = otherLinks;
        this.hasData = true;
      }
      catch(err) {
        console.log('Error getting feature XML: ', err);
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
</script>

<style>
  .feature-details {
    position: absolute;
    bottom: 2rem;
    left: .5rem;
  }

  .feature-details__iframe {
    border: 0;
    width: 258px;
    height: 508px;
  }
</style>
