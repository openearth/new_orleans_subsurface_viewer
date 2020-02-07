<template>

  <v-dialog
    v-model="showWelcomeDialog"
    fullscreen
  >
   <v-card>
    <v-img
      class="title text-center"
      src="~@/assets/img/intro_pic2.png"
      height = 937px
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
/* .background { */
    /* The image used */
    /* 'background-image': `url(${require('@/assets/img/intro_pic.jpg')})` */
    /* background: url('https://mdbootstrap.com/img/Photos/Horizontal/Nature/full page/img(11).jpg'); */
    /* background: url('~@/assets/img/intro_pic2.png'); */

    /* Full height */
    /* width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0; */

    /* background-size: cover; */
    /* background-color: red; */
    /* transform: scale(1.1); */

    /* Center and scale the image nicely */
    /* background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  } */
  /* .welcome-dialog__images {
    display: flex;
    padding: 3rem 2rem 5rem;
    margin-right: 80rem;
    margin-top: 20rem;
    margin-bottom: 0rem;
  }

  .welcome-dialog__images img {
    width: 8rem;
    margin-right: 3rem;
  }
    .welcome-dialog__images2 {
    display: flex;
    padding: 5rem;
  }
    .welcome-dialog__images2 img {
    width: 100%;
    /* margin-right: 10rem;
    margin-left: 10rem; */
  /* }  */
  /* .primary {
    position: justify-center
    justify-center
  } */
</style>
