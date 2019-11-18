<template>
  <v-dialog
    v-model="showWelcomeDialog"
    max-width="640"
  >
    <v-card>
      <v-card-title>
        Welcome
      </v-card-title>
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
      <v-card-text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          class="primary"
          text
          @click="showWelcomeDialog = false"
        >
          Let's get started
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    showWelcomeDialog: true
  })
};
</script>

<style>
  .welcome-dialog__images {
    display: flex;
    padding: 0 1.5rem 1.5rem;
  }

  .welcome-dialog__images img {
    width: 10rem;
    margin-right: 1rem;
  }
</style>
