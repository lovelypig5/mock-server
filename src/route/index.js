'use strict';

var express = require( 'express' ),
    router = express.Router(),
    _ = require( 'lodash' ),
    logger = require( '../logger' ),
    transformerProxy = require( 'transformer-proxy' ),
    mock = require( '../service/mock' ),
    proxy = require( '../proxy' ),
    Mock = require( 'mockjs' ),
    tokenStore = require( '../service/tokenStore' );

/**
 * handle all api not match system apis
 * @method handleApi
 * @param  {[Request]}   req  [description]
 * @param  {[Response]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
router.use( async( req, res, next ) => {
    let token = req.headers.mocktoken;
    if ( token ) {
        let user = await tokenStore.getToken( token );
        if ( user ) {
            user = JSON.parse( user );
            token = user._id;
        } else {
            token = null;
        }
    }
    let type = req.headers.mocktype;
    if ( !type ) { // not mock request
        next();
    } else if ( type && !token ) { // mock request, but without access-token
        return res.json( {
            result: '缺少token或者token已经过期'
        } );
    } else {
        delete req.headers.mocktoken;
        delete req.headers.mocktype;

        let url = decodeURI( req.url );
        let path = decodeURI( req.path );
        let prefix = ( url.match( /\/\w+/ ) || [ "" ] )[ 0 ];
        let author = req.headers.mockauthor;
        if ( author ) {
            prefix = author;
            delete req.headers.mockauthor;
        }
        var project = await mock.getProjects( prefix, token );
        if ( project ) {
            var normalApis = await mock.getNormalApis( project._id, token ) || {};
            var regApis = await mock.getRegApis( project._id, token );
            var api = normalApis[ path ];
            if ( api && api.type == req.method ) { // match normal
                if ( api.dataHandler == "over" ) {
                    let data = JSON.parse( api.result );
                    return res.json( Mock.mock( data ) );
                } else {
                    req.proxy = project.proxy;
                    req._extendData = api.result;
                    next();
                }
            } else if ( regApis ) { // match reg
                regApis.forEach( ( api ) => {
                    if ( new RegExp( api.regexp ).test( url ) && api.type == req.method ) {
                        if ( api.dataHandler == "over" ) {
                            let data = JSON.parse( api.result );
                            return res.json( Mock.mock( data ) );
                        } else {
                            req.proxy = project.proxy;
                            req._extendData = api.result;
                            next();
                        }
                    }
                } );
                if ( url.indexOf( ':' ) != -1 ) {
                    return res.status( 200 ).json( {
                        result: "error happens! have you replace your parameter? "
                    } );
                }
                next();
            } else {
                next();
            }
        } else {
            next();
        }
    }
} );

// override data
router.use( transformerProxy( ( data, req, res ) => {
    if ( req._extendData ) {
        try {
            var ret = JSON.parse( data );
            var extend = JSON.parse( req._extendData );
            ret = _.merge( ret, Mock.mock( extend ) );

            return JSON.stringify( ret );
        } catch ( e ) {
            return JSON.stringify( {
                result: '解析出错，无法合并为json格式数据'
            } );
        }
    }

    return data;
} ) );

router.use( ( req, res, next ) => {
    if ( req.proxy ) {
        proxy.web( req, res, {
            target: req.proxy,
            toProxy: true,
            changeOrigin: true
        } );
    } else {
        next();
    }
} );

var deps = [];
var ret = [ {
    router: router,
    route: '/'
} ];
deps.forEach( ( dep ) => {
    ret.push( require( dep ) );
} );

module.exports = ret;
