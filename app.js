var express = require('express'),
    path = require('path'),
    filters = require('./src/filters'),
    routes = require('./src/route'),
    apis = require('./src/api'),
    logger = require('./src/logger');

var app = express();
app.use(express.static(path.resolve('./assets/dist')));

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

app.listen(3002, function() {
    logger.info(`Backend service listening on port 3002!`);
});