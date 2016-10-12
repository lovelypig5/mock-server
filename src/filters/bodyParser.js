var bodyParser = require('body-parser');

module.exports = [{
    filter: bodyParser.urlencoded({
        limit: '50mb',
        extended: false
    })
}, {
    filter: bodyParser.json({
        limit: '50mb'
    })
}];
