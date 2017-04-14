import Router from 'vue-router';
import ProjectList from '../features/project/list.vue';
import MockSet from '../features/mock/index.vue';

Vue.use(Router);

var routes = [{
    path: '/',
    component: ProjectList
}, {
    path: '/:id',
    name: 'mockSet',
    component: MockSet,
    subRoutes: {
        "/:name": function (params) {
            this.vue.$broadcast("changeMenuBy", params.name);
        }
    }
}];

var router;
if (WEBPACK_DEBUG) {
    router = new Router({
        routes
    });
} else {
    router = new Router({
        mode: 'history',
        routes: routes
    });
}

export default router;
