var BaseDao = require( "./baseDao" ),
    Errors = require( "../../error" ),
    crypto = require( "crypto" );

class UserDao extends BaseDao {

    constructor() {
        super();
        this.Entity = this.db.model( "user", this.schema.user );
    }

    async login( { name, password } ) {
        var hash = crypto.createHash( "md5" );
        var conditions = {
            name: name,
            password: hash.update( password ).digest( "hex" )
        };
        var docs = await this.Entity.find( conditions, { id: true, name: true, salt: true } ).exec();
        if ( docs.length == 0 ) {
            throw new Errors.AuthenticateFail( "用户名或者密码错误" );
        } else if ( docs.length == 1 ) {
            return docs[ 0 ];
        } else {
            throw new Errors.UnknownError( "未知错误,请联系管理员" );
        }
    }

    async register( { name, password } ) {
        var hash = crypto.createHash( "md5" );
        var user = new this.Entity( {
            name,
            password: hash.update( password ).digest( "hex" )
        } )

        return await user.save();
    }

    async remove( { name } ) {
        var docs = await this.Entity.remove( { name: name } );
        if ( docs.result.n == 1 ) {
            return "删除用户成功";
        } else {
            throw new Errors.UnknownError( `用户删除失败，未知原因，请联系管理员。用户账号: ${name}` );
        }
    }
}

module.exports = new UserDao;
