var express = require('express'),
    fallback = require('express-history-api-fallback'),
    filters = require('./filters'),
    routes = require('./route'),
    apis = require('./api');

var app = express();

filters.forEach((filter) => {
    if (filter.route) {
        app.all(filter.route, filter.filter);
    } else {
        app.use(filter.filter);
    }
});
apis.forEach((api) => {
    var method = api.method || 'get';
    app[method](api.route, api.func);
});
routes.forEach((route) => {
    app.use(route.route, route.router);
});

app.use(express.static('../assets/dist'));
app.use(fallback('index.html', {
    root: `../assets/dist`
}));

module.exports = app;
