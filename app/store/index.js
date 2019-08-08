import Vue from 'nativescript-vue';
import NSVuexPersistent from 'nativescript-vuex-persistent';
import Vuex from 'vuex';
Vue.use(Vuex);
Vue.config.devtools = true;
const store = new Vuex.Store({
    state: {
        config: {}
    },
    mutations: {
        setConfig(state, config) {
            for (let key of Object.keys(config)) {
                state.config[key] = config[key];
            }
        },
        clearAll(state) {
            state.config = {};
        }
    },
    actions: {
        setConfig({
            commit
        }, data) {
            commit('setConfig', data);
        },
        clearAll({
            commit
        }) {
            commit('clearAll')
        }
    },
    getters: {
        getConfig: (state) => (name) => {
            return state.config[name];
       }
    },
    plugins: [NSVuexPersistent([
        'config',
    ])]
});

Vue.prototype.$store = store;

export default store;
