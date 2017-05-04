var deps = [ './userDao', './projectDao', './mockDao' ];

describe( "Dao of Mock Server.", () => {
    deps.forEach( ( dep ) => {
        require( dep );
    } );
} )
