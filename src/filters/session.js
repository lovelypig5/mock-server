var config = require( '../config' ),
    tokenStore = require( '../service/tokenStore' );

module.exports = [ {
    route: `/${config.APIPATH}/*`,
    filter: async( req, res, next ) => {
        var accessToken = req.headers[ 'access-token' ];
        if ( accessToken ) {
            let user = await tokenStore.getToken( accessToken );
            if ( user ) {
                user = JSON.parse( user );
                req.user = user;

                next();
            } else {
                res.status( 401 ).send( '请先登录!' );
            }
        } else {
            res.status( 401 ).send( '请先登录!' );
        }
    }
} ]
