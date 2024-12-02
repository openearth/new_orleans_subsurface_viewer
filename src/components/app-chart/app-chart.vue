<template>
    <div class="app-chart">
      <div v-if="isLoading" class="app-chart__loader">
        <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
        />
      </div>
      <div v-else class="app-chart__container">
        <slot />
      </div>
    </div>
  </template>
  
  <script>
    const TIMEOUT_DURATION = 1000; // 1 second
  
    export default {
      props: {
        title: {
          type: String,
          default: '',
        },
      },
      data() {
        return {
          isLoading: true,
        };
      },
      created() {
        setTimeout(() => this.isLoading = false, TIMEOUT_DURATION);
      },
    };
  </script>
  
  <style src="./app-chart.css"></style>