var deps = [ "./projectApi", "./mockApi", "./userApi", "./pageApi" ];
var ret = [];
deps.forEach( ( dep ) => {
    Array.prototype.push.apply( ret, require( dep ) );
} )

module.exports = ret;
