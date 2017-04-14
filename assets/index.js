import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import 'bootstrap/dist/css/bootstrap-theme.min.css';
import './css/index.css';
import './less/main.less';
import './lib/plugins/jsoneditor.min.css';
import App from './js/app.vue';

if (process.env.NODE_ENV == "development") {
    Vue.config.debug = true;
}
