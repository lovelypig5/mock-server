// var mysql = require('mysql');
var mongoose = require( "mongoose" ),
    config = require( "../config" ),
    DICT = config.DICT,
    logger = require( "../logger" );

mongoose.Promise = global.Promise;

var pool;
var {
    dialect = "",
    host,
    port,
    user,
    password,
    schema
} = config.DB;

switch ( dialect ) {
case DICT.DB.MONGO:
    var connectStr =
        `mongodb://${user ? ( user + ":" + password + "@" ) : ""}${host}${port ? ( ":" + port ) : ""}${schema ? "/" + schema : ""}?authSource=admin`;
    pool = mongoose.connect( connectStr, {
        server: {
            poolSize: 10,
            autoReconnect: true
        }
    }, ( err ) => {
        if ( err ) {
            logger.error( err );
            throw err;
        }
    } );
    break;
default:
    logger.error( "No dialect found in config/index.js!" );
    break;
}
//
// var pool = mysql.createPool({
//     connectionLimit: 10,
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'wms'
// });

module.exports = pool;
