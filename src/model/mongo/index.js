var deps = [ "./project", "./mockset", "./user" ];
var ret = [];
deps.forEach( ( dep ) => {
    Array.prototype.push.apply( ret, require( dep ) );
} )

module.exports = ret;
