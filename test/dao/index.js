var deps = [ './userDao', './projectDao', './mockDao' ];

describe( "Backend of Mock Server.", () => {
    deps.forEach( ( dep ) => {
        require( dep );
    } );
} )
