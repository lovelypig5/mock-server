var deps = [ './userApi' ];

describe( "Api of Mock Server.", () => {
    deps.forEach( ( dep ) => {
        require( dep );
    } );
} )
