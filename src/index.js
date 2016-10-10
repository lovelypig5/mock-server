var app = require('./app'),
    logger = require('./logger');

app.listen(3002, function() {
    logger.info(`Backend service listening on port 3002!`);
});
