var _ = require( 'lodash' ),
    config = require( '../config' ),
    userDao = require( `../dao/${config.DB.dialect}/userDao` ),
    BaseApi = require( './baseApi' ),
    tokenStore = require( '../service/tokenStore' );

class UserApi extends BaseApi {

    async login( req, res ) {
        var user = _.pick( req.body, [ 'userName', 'password' ] );
        if ( !user.userName ) {
            return res.status( 400 ).send( '用户名不能为空' );
        }
        if ( !user.password ) {
            return res.status( 400 ).send( '密码不能为空' );
        }

        try {
            var result = await userDao.login( { name: user.userName, password: user.password } );
            result = result.toJSON();
            result.token = result._id + '' + Date.now();
            await tokenStore.setToken( result.token, JSON.stringify( result ), 'EX', config.maxAge / 1000 );
            res.status( 200 ).json( result );
        } catch ( err ) {
            var result = super.handleErr( err );
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
            res.status( 401 ).send( '没有登录' );
        }
    }
}

var userApi = new UserApi();

module.exports = [ {
    method: 'post',
    route: '/_login',
    func: userApi.login
}, {
    method: 'post',
    route: `/${config.APIPATH}/_logout`,
    func: userApi.logout
}, {
    method: 'get',
    route: `/${config.APIPATH}/_user`,
    func: userApi.user
}, {
    method: 'get',
    route: '/_isLogin',
    func: userApi.isLogin
} ]
