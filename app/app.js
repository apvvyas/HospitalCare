import Vue from "nativescript-vue";
import Route from "./routes";
import store from "./store";
import Home from "./components/Home";
import * as application from 'tns-core-modules/application';
import VueDevtools from 'nativescript-vue-devtools';
import Helpers from '@/shared/helpers';

import {
    TNSFontIcon,
    fonticon
} from 'nativescript-fonticon';


import RadSideDrawer from "nativescript-ui-sidedrawer/vue";
Vue.use(RadSideDrawer);

if (TNS_ENV !== 'production') {
    Vue.use(VueDevtools,{ host: '10.10.10.43' })
}
let route = new Route();

Vue.config.silent = (TNS_ENV === 'production');
Vue.prototype.$routes = route.getAllRoutes();
Vue.prototype.$store = store;
Vue.prototype.$serverBus = new Vue();
Vue.prototype.$helpers = Helpers;

TNSFontIcon.debug = true;
TNSFontIcon.paths = {
    'fa': './fonts/font-awesome.css'
};
TNSFontIcon.loadCss();

Vue.filter('fonticon', fonticon);


new Vue(route.getRender()).$start();
