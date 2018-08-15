"use strict";

var _ = require( "lodash" );
const logger = require( "./logger" );
const timers = new Map();
const uuidv4 = require( "uuid/v4" );

class Utils {
    /**
     * deep extend obj
     * @method extendDeep
     * @param  {[type]}         toObject [description]
     * @param  {[type]}         fromObj  [description]
     * @return {[type]}                  [description]
     */
    extendDeep( toObject, fromObj ) {
        if ( _.isObject( fromObj ) ) {
            if ( !_.isObject( toObject ) ) {
                toObject = fromObj;
            } else {
                for ( var key in fromObj ) {
                    if ( toObject[ key ] === undefined || this.isNotAOF( toObject[ key ] ) ) {
                        toObject[ key ] = fromObj[ key ];
                    } else {
                        this.extendDeep( toObject[ key ], fromObj[ key ] );
                    }
                }
            }
        } else if ( _.isArray( fromObj ) ) {
            if ( !_.isArray( toObject ) ) {
                toObject = fromObj;
            } else if ( fromObj.length == 1 ) {
                toObject.forEach( ( n, i ) => {
                    if ( this.isNotAOF( toObject[ i ] ) ) {
                        toObject[ i ] = fromObj[ 0 ];
                    } else {
                        this.extendDeep( toObject[ i ], fromObj[ 0 ] );
                    }
                } );
            } else {
                fromObj.forEach( ( n, i ) => {
                    if ( toObject.length <= i || this.isNotAOF( toObject[ i ] ) ) {
                        toObject[ i ] = n;
                    } else {
                        this.extendDeep( toObject[ i ], n );
                    }
                } );
            }
        } else if ( this.isNotAOF( toObject ) ) {
            toObject = fromObj;
        }
    }

    isNotAOF( value ) {
        return !( _.isFunction( value ) || _.isArray( value ) || _.isObject( value ) );
    }

    ajaxModel( status, ret ) {
        return {status: status, ret: ret};
    }

    /**
     * 设置计时器
     * 1. 如果不存在，创建计时器，并打印开始时间
     * 2. 如果已经存在，删除计时器，并打印结束时间和持续时间
     *
     * @param {String} id : 计时器的名称
     * @memberof Utils
     */
    getTimer( id ) {
        if ( !id ) {
            id = uuidv4();
        }
        var timer = timers.get( id );
        if ( !timer ) {
            var start = Date.now();
            timers.set( id, start );
            logger.info( `Start timer ${id} at timestamp ${start}` );
            return id;
        } else {
            var end = Date.now();
            logger.info( `End timer ${id} at timestamp ${end}, during: ${end - timer}ms` );
            timers.delete( id );
        }
    }
}

module.exports = new Utils();
