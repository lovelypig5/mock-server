var BaseApi = require( "./baseApi" );

class PageApi extends BaseApi {

    index( req, res ) {
        return res.render( "index" );
    }

    admin( req, res ) {
        return res.render( "admin" );
    }
}


var pageApi = new PageApi();
module.exports = [ {
    method: "get",
    route: "/index",
    func: pageApi.index
}, {
    method: "get",
    route: "/admin",
    func: pageApi.admin
} ];
