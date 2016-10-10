var express = require('express'),
    fallback = require('express-history-api-fallback'),
    logger = require('./logger'),
    filters = require('./filters'),
    routes = require('./route'),
    apis = require('./api'),
    proxy = require('./proxy'),
    mock = require('./mock');

var app = express();

filters.forEach((filter) => {
    if (filter.route) {
        app.all(filter.route, filter.filter);
    } else {
        app.use(filter.filter);
    }
});
routes.forEach((route) => {
    app.use(route.route, route.router);
});
apis.forEach((api) => {
    var method = api.method || 'get';
    app[method](api.route, api.func);
});

app.use(express.static('../assets/dist'));

app.use('*', mock.handleApi);

// app.use(fallback('index.html', {
//     root: `../assets/dist`
// }));

module.exports = app;
