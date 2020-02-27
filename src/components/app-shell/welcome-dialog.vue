<template>
  <v-container fluid fill-height>
  <v-dialog
    v-model="showWelcomeDialog"
    fullscreen

  >

   <v-card>

    <v-img
      class="title text-center"
      src="~@/assets/img/intro_pic2.png"

      height="100vh"
    >
      <v-card-title></v-card-title>
      <v-spacer>
        New Orleans: Urban geology and Groundwater
      </v-spacer>

      <v-layout align-end justify-center>
          <v-flex xs6>
            <!--- v-flex is centered now, but we need to center button inside v-flex -->
            <div class="text-xs-center">
              <v-btn
               class="primary "
               text
               @click="onStartClick"
               >Let's get started

               </v-btn>
            </div>

          </v-flex>
      </v-layout>

    </v-img>
    </v-card>
  </v-dialog>
  </v-container>
</template>

<script>
const LOCALSTORAGE_KEY = 'intro_seen';


export default {
  data: () => ({
    showWelcomeDialog: true
  }),

  beforeMount() {
    const seen = window.localStorage.getItem(LOCALSTORAGE_KEY);

    if(seen) {
      this.showWelcomeDialog = true;
    }
  },

  methods: {
    onStartClick() {
      this.showWelcomeDialog = false;

      window.localStorage.setItem(LOCALSTORAGE_KEY, true);

    }
  }
};
</script>
