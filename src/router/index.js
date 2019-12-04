import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

import Geology from '@/views/Geology';
import Model from '@/views/Model';
import Data from '@/views/Data';
import Monitoring from '@/views/Monitoring';
import Subsidence from '@/views/Subsidence';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/geology'
  },
  {
    path: '/geology',
    name: 'geology',
    component: Geology
  },
  {
    path: '/model',
    name: 'model',
    component: Model
  },
  {
    path: '/data',
    name: 'data',
    component: Data
  },
  {
    path: '/monitoring',
    name: 'monitoring',
    component: Monitoring
  },
  {
    path: '/subsidence',
    name: 'subsidence',
    component: Subsidence
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  store.commit('mapbox/RESET_ALL');
  next();
});

export default router;
