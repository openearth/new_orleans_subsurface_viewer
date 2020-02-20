<template>
  <!-- <v-dialog
   v-model="tabLocation"
    hide-overlay
    internal-activator
    persistent
    no-click-animation> -->

        <v-card flat tile  >
          <v-card-title>
            <span class="headline">The New Orleans subsurface web-viewer</span>
          </v-card-title>
          <v-card-text>This web-viewer provides essential geographical information for New Orleans, which is divided into nine topics, corresponding to the menu.
            This application provides static maps and functionality to extract information from subsurface models and different borelogs. Additionally, some of the data is
            accompanied by relevant reports. This web application aims at providing relevant information for experts, decision-makers and citizens.
           </v-card-text>
            <v-img
            class="title text-center"
            src="~@/assets/img/o.jpg"
           ></v-img>

        </v-card>
      <!-- </v-dialog> -->

</template>

<script>


export default {
//   data: () => ({
//     tabLocation:false
//   }),

//   created() {
//     const seen = window.location.hash;

//     if(seen == '#/intro') {
//       this.tabLocation = true;
//     }
//   },
};
</script>
