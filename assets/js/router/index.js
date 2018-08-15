import Router from "vue-router";
Vue.use( Router );

var routes = [ {
    path: "/",
    component( resolve ) {
        return require( [ "../features/project/list.vue" ], resolve );
    }
}, {
    path: "/project",
    component( resolve ) {
        return require( [ "../features/project/list.vue" ], resolve );
    }
}, {
    path: "/:id",
    name: "mockSet",
    component( resolve ) {
        return require( [ "../features/mock/index.vue" ], resolve );
    },
    subRoutes: {
        "/:name": function( params ) {
            this.vue.$broadcast( "changeMenuBy", params.name );
        }
    }
} ];

var router = new Router( {
    routes
} );

export default router;
