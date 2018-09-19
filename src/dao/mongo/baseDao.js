var pool = require( "../../db/pool" ),
    logger = require( "../../logger" ),
    schema = require( "../../schema/mongo" );

class BaseDao {

    /**
     * init db poll, logger and db schema
     * @method constructor
     */
    constructor() {
        this.db = pool;
        this.logger = logger;
        this.schema = schema;
    }

    /**
     * response model
     * @method model
     * @param  {Number} status : add status
     * @param  {Object} ret    : response entity
     * @return {Object}
     */
    model( status, ret ) {
        return {
            status: status,
            ret: ret
        }
    }
}

module.exports = BaseDao;
