<script>
import template from "templates/app.html";
import store from "./vuex/store";
import Common from "./common/index.vue";
import router from "./router";
import filters from "./filters";
import Cookies from "js-cookie";

$.ajaxSetup( {
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    headers: {
        "Access-Token": Cookies.get( "access-token" )
    },
    statusCode: {
        401: () => {
            location.href = "/oauth2?url=" + location.href;
        }
    }
} )

const App = new Vue( {
    template: template,
    store,
    router,
    filters,
    components: {
        common: Common
    }
} );

export default App;
</script>
