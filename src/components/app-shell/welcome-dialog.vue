<template>
  <v-dialog
    v-model="showWelcomeDialog"
    max-width="640"
  >
    <v-card>
      <v-card-title>
        New Orleans: Urban geology and Groundwater
      </v-card-title>


      <div class="welcome-dialog__images2">
       <img
          src="@/assets/img/intro_pic.jpg"
          alt="Deltares logo"
        >
      </div>
      <v-card-text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </v-card-text>


      <v-card-actions>
        <v-spacer></v-spacer>
        <div class="welcome-dialog__images">
              <img
                src="@/assets/img/OE_logo.png"
                alt="OE logo"
              >
              <img
                src="@/assets/img/logo-m-2x.png"
                alt="Deltares logo"
              >
        </div>
        <v-btn
          class="primary"
          text
          @click="onStartClick"
        >
          Let's get started
        </v-btn>

      </v-card-actions>
    </v-card>
  </v-dialog>
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

<style>
  .welcome-dialog__images {
    display: flex;
    padding: 0.5 1.5rem 5;
  }

  .welcome-dialog__images img {
    width: 5rem;
    margin-right: 8rem;
  }
    .welcome-dialog__images2 {
    display: flex;
    padding: 1.5rem 5rem 1.5rem;
  }
    .welcome-dialog__images2 img {
    width: 30rem;
    margin-right: 10rem;
  }
</style>
