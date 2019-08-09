//Import All Modules
import Vue from "nativescript-vue";
import Route from "./routes";
import store from "./store";
import config from '@/config';
import Home from "./components/Home";
import Helpers from '@/shared/helpers';
import VueDevtools from 'nativescript-vue-devtools';
import RadSideDrawer from "nativescript-ui-sidedrawer/vue";
import * as application from 'tns-core-modules/application';
import {
    TNSFontIcon,
    fonticon
} from 'nativescript-fonticon';


//Route Init
let route = new Route();

//Define Global Variables
Vue.config.silent = (TNS_ENV === 'production');
Vue.prototype.$routes = route.getAllRoutes();
Vue.prototype.$store = store;
Vue.prototype.$serverBus = new Vue();
Vue.prototype.$helpers = Helpers;
Vue.prototype.$config = config;

//Define Font Awesome Css
TNSFontIcon.debug = true;
TNSFontIcon.paths = {
    'fa': './fonts/font-awesome.css'
};
TNSFontIcon.loadCss();

// Init Drawer
Vue.use(RadSideDrawer);

// Add Fonticons to the vue filter
Vue.filter('fonticon', fonticon);

// Vue Developer tools for the debugging [Only for development Mode]
if (TNS_ENV !== 'production') {
    Vue.use(VueDevtools,{ host: '10.10.10.43' })
}

//Init
new Vue(route.getRender()).$start();
