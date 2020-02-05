import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

import Geology from '@/views/Geology';
import Subsurface from '@/views/Subsurface';
import Data from '@/views/Data';
import Monitoring from '@/views/Monitoring';
import Subsidence from '@/views/Subsidence';
import Salinisation from '@/views/Salinisation';
import GreenInfra from '@/views/Green';
import Model from '@/views/Model';
import Intro from '@/views/Intro';


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/intro'
  },
  {
    path: '/geology',
    name: 'geology',
    component: Geology
  },
  {
    path: '/subsurface',
    name: 'subsurface',
    component: Subsurface
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
  },
  {
    path: '/salinisation',
    name: 'salinisation',
    component: Salinisation
  },
  {
    path: '/green',
    name: 'green',
    component: GreenInfra
  },
  {
    path: '/model',
    name: 'model',
    component: Model
  },
  {
    path: '/intro',
    name: 'intro',
    component: Intro
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
