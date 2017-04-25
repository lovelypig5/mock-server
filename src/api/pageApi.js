var BaseApi = require('./baseApi');

class PageApi extends BaseApi {

    index(req, res) {
        res.render('index');
    }

    mock(req, res) {
        res.render('admin');
    }
}


var pageApi = new PageApi();
module.exports = [{
    method: 'get',
    route: `/index`,
    func: pageApi.index
}, {
    method: 'get',
    route: `/mock`,
    func: pageApi.mock
}];
