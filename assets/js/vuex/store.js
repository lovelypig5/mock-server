import Vuex from 'vuex';
import actions from './actions';
import state from './state';
import getters from './getters';
import mutations from './mutations';

Vue.use(Vuex);

const store = new Vuex.Store({
    state,
    mutations,
    getters,
    actions
});

export default store;
