<script>
import template from 'templates/app.html';
import store from './vuex/store';
import Common from './common/index.vue';
import router from './router';

$.ajaxSetup({
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    statusCode: {
        401: () => {
            router.go({
                path: '/login'
            })
        }
    }
})

const App = new Vue({
    template: template,
    store,
    router,
    components: {
        common: Common
    }
}).$mount('#app');

export default App;
</script>
