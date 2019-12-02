import Vue from 'vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import Vue2MapboxGL from 'vue2mapbox-gl';
import AppShell from '@/components/app-shell';

Vue.config.productionTip = false;
Vue.use(Vue2MapboxGL);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(AppShell)
}).$mount('#app');
