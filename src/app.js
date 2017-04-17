var express = require('express'),
    path = require('path'),
    filters = require('./filters'),
    routes = require('./route'),
    apis = require('./api'),
    logger = require('./logger');

var app = express();
app.use(express.static(path.resolve('../assets/dist')));

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

app.listen(3003, function () {
    logger.info(`Backend service listening on port 3003!`);
});
