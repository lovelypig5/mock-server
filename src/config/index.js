var env = process.env.NODE_ENV;
if ( !env ) {
    env = "production";
}
var DICT = require( `./${env}/dict` );

module.exports = {
    DB: DICT.MONGO,
    DICT: DICT,
    APIPATH: "_system"
};
