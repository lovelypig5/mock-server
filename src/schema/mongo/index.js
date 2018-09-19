var mongoose = require( "mongoose" ),
    config = require( "../../config" ),
    models = require( `../../model/${config.DB.dialect}` );

var schemas = {};
models.forEach( ( {name, model} ) => {
    var schema = new mongoose.Schema( model );
    schemas[ name ] = schema;
} );

module.exports = schemas;
