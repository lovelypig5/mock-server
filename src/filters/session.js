var config = require( "../config" ),
    tokenStore = require( "../service/tokenStore" ),
    oauth2Svc = require( "../service/oauth2" ),
    logger = require( "../logger" );

module.exports = [ {
    route: `/${config.APIPATH}/*`,
    filter: async ( req, res, next ) => {
        var accessToken = req.headers[ "access-token" ];
        if ( accessToken ) {
            try {
                accessToken = await tokenStore.getToken( accessToken );
                var user = await oauth2Svc.getUserInfo( accessToken );
                if ( user ) {
                    // 俊源可以看鑫磊的接口
                    if ( user.id == 279 || user.id == 99 ) {
                        user.id = 332;
                    }
                    req.user = user;
                    req.user._id = user.id;
                    req.user.token = accessToken;

                    next();
                } else {
                    res.status( 401 ).send( "请先登录!" );
                }
            } catch ( err ) {
                logger.error( err );
                res.status( 401 ).send( "请先登录!" );
            }
        } else {
            res.status( 401 ).send( "请先登录!" );
        }
    }
} ]
