<script>
import template from 'templates/app.html';
import store from './vuex/store';
import Common from './common/index.vue';
import router from './router';
import filters from './filters';

$.ajaxSetup({
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    statusCode: {
        401: () => {
            router.push({
                path: '/'
            })
        }
    }
})

const App = new Vue({
    template: template,
    store,
    router,
    filters,
    components: {
        common: Common
    }
}).$mount('#app');

export default App;
</script>
