import Router from 'vue-router';
Vue.use(Router);

var routes = [{
    path: '/login',
    component(resolve) {
        return require(['../features/login.vue'], resolve);
    }
}, {
    path: '/',
    component(resolve) {
        return require(['../features/project/list.vue'], resolve);
    }
}, {
    path: '/:id',
    name: 'mockSet',
    component(resolve) {
        return require(['../features/mock/index.vue'], resolve);
    },
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
