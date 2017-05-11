var redis = require( 'redis' ),
    bluebird = require( 'bluebird' ),
    config = require( '../config' ),
    logger = require( '../logger' );

var client = redis.createClient( config.REDIS );

client.on( "error", function ( err ) {
    logger.error( err );
} );
client.on( "connect", function ( msg ) {
    logger.info( "connect" );
} );
client.on( "reconnecting", function ( msg ) {
    logger.info( "reconnecting" );
} );
client.on( "end", function ( msg ) {
    logger.info( "end" );
} );

bluebird.promisifyAll( redis.RedisClient.prototype );
bluebird.promisifyAll( redis.Multi.prototype );

module.exports = client;
