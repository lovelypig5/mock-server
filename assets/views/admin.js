import "less/admin.less";
import "bootstrap";
import App from "js/app.vue";

if ( process.env.NODE_ENV == "development" ) {
    Vue.config.debug = true;
}

App.$mount( "#app" );