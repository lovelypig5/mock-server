var redis = require( 'redis' ),
    bluebird = require( 'bluebird' ),
    config = require( '../config' ),
    logger = require( '../logger' );

var client = redis.createClient( config.REDIS );

client.on( "error", ( err ) => {
    logger.error( err );
} );
client.on( "connect", ( msg ) => {
    logger.info( "connected" );
} );
client.on( "reconnecting", ( msg ) => {
    logger.info( "reconnecting" );
} );
client.on( "end", ( msg ) => {
    logger.info( "end" );
} );

bluebird.promisifyAll( redis.RedisClient.prototype );
bluebird.promisifyAll( redis.Multi.prototype );

module.exports = client;
