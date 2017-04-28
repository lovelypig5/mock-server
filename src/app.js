var express = require('express'),
    path = require('path'),
    filters = require('./filters'),
    routes = require('./route'),
    apis = require('./api'),
    logger = require('./logger'),
    consolidate = require('consolidate'),
    mock = require('./service/mock');

var app = express();
app.engine('html', consolidate.ejs);
app.set('views', '../assets/dist');
app.set('view engine', 'html');
app.set('x-powered-by', false);

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

app.use(express.static(path.resolve('../assets/dist')));

mock.init().then(() => {
    app.listen(3003, () => {
        logger.info(`Backend service listening on port 3003!`);
    });
});
