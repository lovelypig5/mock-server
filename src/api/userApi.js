var _ = require( "lodash" ),
    config = require( "../config" ),
    userDao = require( `../dao/${config.DB.dialect}/userDao` ),
    BaseApi = require( "./baseApi" ),
    tokenStore = require( "../service/tokenStore" ),
    oauth2Svc = require( "../service/oauth2" );

class UserApi extends BaseApi {

    async login( req, res ) {
        var user = _.pick( req.body, [ "userName", "password" ] );
        if ( !user.userName ) {
            return res.status( 400 ).send( "用户名不能为空" );
        }
        if ( !user.password ) {
            return res.status( 400 ).send( "密码不能为空" );
        }

        try {
            let result = await userDao.login( { name: user.userName, password: user.password } );
            result = result.toJSON();
            result.token = result._id + "" + Date.now();
            await tokenStore.setToken( result.token, JSON.stringify( result ), "EX", config.maxAge / 1000 );
            res.status( 200 ).json( result );
        } catch ( err ) {
            let result = super.handleErr( err );
            return res.status( result.status ).send( result.ret );
        }
    }

    async logout( req, res ) {
        var token = req.user.token;
        await tokenStore.deleteToken( token );
        res.status( 200 ).send( {} );
    }

    user( req, res ) {
        res.status( 200 ).json( req.user || {} );
    }

    isLogin( req, res ) {
        if ( req.user ) {
            res.status( 200 ).json( req.user );
        } else {
            res.status( 401 ).send( "没有登录" );
        }
    }

    async oauth2( req, res ) {
        var {
            url
        } = req.query;
        if( !url ) {
            return res.status( 400 ).send( "缺少参数" );
        }
        await oauth2Svc.doOauth2( res, url );
    }

    /**
     * OAuth2 callback
     * @param {*} req 
     * @param {*} res 
     */
    async callback( req, res ) {
        var {
            code,
            state
        } = req.query;

        if( !code || !state ) {
            return res.status( 400 ).send( "缺少参数" );
        }

        try {
            const result = await oauth2Svc.getToken( code );
            res.cookie( "access-token", result.access_token );
            await tokenStore.setToken( result.access_token, result.access_token, "EX", result.expires_in );
            res.redirect( state );
        } catch ( err ) {
            var result = super.handleErr( err );
            return res.status( result.status ).send( result.ret );
        }
    }
}

var userApi = new UserApi();

module.exports = [ {
    method: "post",
    route: "/_login",
    func: userApi.login
}, {
    method: "get",
    route: "/oauth2",
    func: userApi.oauth2
}, {
    method: "get",
    route: "/callback",
    func: userApi.callback
}, {
    method: "post",
    route: `/${config.APIPATH}/_logout`,
    func: userApi.logout
}, {
    method: "get",
    route: `/${config.APIPATH}/_user`,
    func: userApi.user
}, {
    method: "get",
    route: "/_isLogin",
    func: userApi.isLogin
} ]
