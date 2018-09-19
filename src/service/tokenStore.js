var client = require( "../db/redis" ),
    logger = require( "../logger" );

class TokenStore {

    constructor() {

    }

    async setToken() {
        logger.debug( "----------- SET TOKEN -----------" );
        logger.debug( arguments );
        logger.debug( "                                 " );
        await client.setAsync( ... arguments );
    }

    async getToken() {
        return await client.getAsync( ... arguments );
    }

    async deleteToken() {
        return await client.delAsync( ... arguments );
    }

}

module.exports = new TokenStore();
