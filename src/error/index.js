var deps = [ "./notFound", "./exist", "./notEnough", "./dataError",
    "./unknownError", "./authenticateFail"
]
var capitalize = ( s ) => {
    return s.charAt( 0 ).toUpperCase() + s.slice( 1 );
}
var ret = {};
deps.forEach( ( dep ) => {
    ret[ capitalize( dep.replace( "./", "" ) ) ] = require( dep );
} )

module.exports = ret;
