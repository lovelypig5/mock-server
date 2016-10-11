var express = require('express'),
    fallback = require('express-history-api-fallback'),
    filters = require('./filters'),
    routes = require('./route'),
    apis = require('./api'),
    logger = require('./logger');

var app = express();
app.use(express.static('../assets/dist'));

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

// app.use(fallback('index.html', {
//     root: `../assets/dist`
// }));

app.listen(3002, function() {
    logger.info(`Backend service listening on port 3002!`);
});
