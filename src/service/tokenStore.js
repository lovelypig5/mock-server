var client = require( '../db/redis' ),
    logger = require( '../logger' );

class TokenStore {

    constructor() {

    }

    async setToken() {
        logger.info( '----------- SET TOKEN -----------' );
        logger.info( arguments );
        logger.info( '                                 ' );
        await client.setAsync( ...arguments );
    }

    async getToken() {
        return await client.getAsync( ...arguments );
    }

    async deleteToken() {
        return await client.deleteAsync( ...arguments );
    }

}

module.exports = new TokenStore();
