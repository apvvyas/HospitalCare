import App from "../components/App";
import Login from "../components/Login";
import Home from "../components/Home";
import Browse from "../components/Browse";
import Featured from "../components/Featured";
import Search from "../components/Search";
import Settings from "../components/Settings";
import store from "../store";
import DrawerContent from "../components/DrawerContent";

//Define All the navigatable routes
const routes = {
	app:App,
	login:Login,
	home:Home,
	browse:Browse,
	featured:Featured,
	search:Search,
	settings:Settings
};

//Route Class for any execution
export default class Route{

	getRoutes() {
		if (store.getters.getConfig('token')) { 
		   return routes.home;
		} else {
		    return routes.login;
		}
	}

	getRoute(key){
		return routes[key];
	}

	getRender(){
		let routeScreen = this.getRoutes();
		let beforeAuthRenderJson = {
	    	render: h => h("frame", [h(routeScreen)]),
	    	store
	  	}
		let renderJson = {
			render (h) {
		        return h(
		          App,
		          [
		            h(DrawerContent, { slot: 'drawerContent' }),
		            h(routeScreen, { slot: 'mainContent' })
		          ]
		        )
		      },
		      store
		}

		if (store.getters.getConfig('token')) { 
			return renderJson;
		}

		return beforeAuthRenderJson;
	}

	getAllRoutes(){
		return routes;
	}
} 