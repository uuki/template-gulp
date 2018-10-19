import Vue from 'vue';
import Vuex from 'vuex';

// Modules
import moduleSample from './modules/sample';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    sample: moduleSample,
  },
});