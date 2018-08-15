var config = require( '../config' ),
    tokenStore = require( '../service/tokenStore' );
var request = require("request-promise");

module.exports = [ {
    route: `/${config.APIPATH}/*`,
    filter: async( req, res, next ) => {
        var accessToken = req.headers[ 'access-token' ];
        if ( accessToken ) {
            accessToken = await tokenStore.getToken( accessToken );
            var user = await request({
                url: "https://oauth.agoralab.co/api/userInfo",
                headers: {
                    'Authorization': "Bearer " + accessToken
                }
            })
            if ( user ) {
                user = JSON.parse( user );
                req.user = user;
                req.user._id = user.id;
                req.user.token = accessToken;

                next();
            } else {
                res.status( 401 ).send( '请先登录!' );
            }
        } else {
            res.status( 401 ).send( '请先登录!' );
        }
    }
} ]
