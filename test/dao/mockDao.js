var expect = require( 'chai' ).expect,
    _ = require( 'lodash' ),
    config = require( '../../src/config' ),
    userDao = require( `../../src/dao/${config.DB.dialect}/userDao` ),
    projectDao = require( `../../src/dao/${config.DB.dialect}/projectDao` ),
    mockDao = require( `../../src/dao/${config.DB.dialect}/mockDao` ),
    Errors = require( '../../src/error' );

var CONST = require( '../config' ),
    user = CONST.user,
    project = CONST.project,
    mockapi = CONST.mockapi;

describe( 'MockDao Test', () => {

    before( ( done ) => {
        userDao.register( user ).then( ( _user ) => {
            user = Object.assign( _user, user );
            project.userId = mockapi.userId = user._id;
            projectDao.createProject( project ).then( ( _project ) => {
                project = Object.assign( _project.toJSON(), project );
                mockapi.projectId = project._id;
                done();
            } ).catch( done );
        } ).catch( done );
    } )

    describe( '#createMockApi', () => {
        it( 'create mock api with no projectId', ( done ) => {
            mockDao.createMockApi( _.omit( mockapi, [ 'projectId' ] ) ).then( null, ( { errors } ) => {
                expect( errors[ 'projectId' ].message ).to.equal(
                    'Path `projectId` is required.' )
                done();
            } ).catch( done );
        } )
        it( 'create mock api with no userId', ( done ) => {
            mockDao.createMockApi( _.omit( mockapi, [ 'userId' ] ) ).then( null, ( err ) => {
                expect( err ).to.be.instanceof( Errors.NotFound );
                done();
            } ).catch( done );
        } )
        it( 'create mock api with no url', ( done ) => {
            mockDao.createMockApi( _.omit( mockapi, [ 'url' ] ) ).then( null, ( { errors } ) => {
                expect( errors[ 'url' ].message ).to.equal(
                    'Path `url` is required.' )
                done();
            } ).catch( done );
        } )
        it( 'create mock api with no result', ( done ) => {
            mockDao.createMockApi( _.omit( mockapi, [ 'result' ] ) ).then( null, ( { errors } ) => {
                expect( errors[ 'result' ].message ).to.equal(
                    'Path `result` is required.' )
                done();
            } ).catch( done );
        } )
        it( 'create mock api with no param', ( done ) => {
            mockDao.createMockApi( _.omit( mockapi, [ 'param' ] ) ).then( null, ( { errors } ) => {
                expect( errors[ 'param' ].message ).to.equal(
                    'Path `param` is required.' )
                done();
            } ).catch( done );
        } )
        it( 'create mock api ', ( done ) => {
            mockDao.createMockApi( mockapi ).then( ( _mockapi ) => {
                mockapi = Object.assign( _mockapi.toJSON(), mockapi );
                done();
            } ).catch( done );
        } )
    } )

    describe( '#getMockApis', () => {
        it( 'get mock api with no project id', ( done ) => {
            mockDao.getMockApis( null, mockapi.userId ).then( ( mockapis ) => {
                expect( mockapis ).to.have.length( 1 );
                done();
            } ).catch( done );
        } )
        it( 'get mock api with no user id', ( done ) => {
            mockDao.getMockApis( mockapi._id, null ).then( ( mockapis ) => {
                expect( mockapis ).to.have.length( 0 );
                done();
            } ).catch( done );
        } )
        it( 'get mock api ', ( done ) => {
            mockDao.getMockApis( mockapi._id, mockapi.userId ).then( ( mockapis ) => {
                expect( mockapis ).to.have.length( 1 );
                done();
            } ).catch( done );
        } )
    } )

    describe( '#listMockApis', () => {
        it( 'list api with no project id', ( done ) => {
            mockDao.listMockApis( null, mockapi.userId ).then( ( mockapis ) => {
                expect( mockapis ).to.have.length( 0 );
                done();
            } ).catch( done );
        } )
        it( 'list api with no user id', ( done ) => {
            mockDao.listMockApis( mockapi.projectId, null ).then( ( mockapis ) => {
                expect( mockapis ).to.have.length( 0 );
                done();
            } ).catch( done );
        } )
        it( 'list api ', ( done ) => {
            mockDao.listMockApis( mockapi.projectId, mockapi.userId ).then( ( projects ) => {
                expect( projects ).to.have.length( 1 );
                done();
            } ).catch( done );
        } )
    } )

    describe( '#modifyMockApi', () => {
        it( 'modify api with no id', ( done ) => {
            mockDao.modifyMockApi( null, _.omit( mockapi, [ '_id' ] ) ).then( null, ( err ) => {
                expect( err ).to.be.instanceof( Errors.UnknownError );
                done();
            } ).catch( done );
        } )
        it( 'modify api with no userId', ( done ) => {
            mockDao.modifyMockApi( mockapi._id, _.omit( mockapi, [ 'userId' ] ) ).then( null,
                ( err ) => {
                    expect( err ).to.be.instanceof( Errors.NotFound );
                    done();
                } ).catch( done );
        } )
        it( 'modify api', ( done ) => {
            mockapi = Object.assign( mockapi, {
                url: '/ci/test_ci',
                result: "{a:1}",
                dataHandler: "overlying",
                type: "POST",
                isreg: false,
                param: "{a:1}",
                active: false,
                modifyTime: Date.now()
            } )
            mockDao.modifyMockApi( mockapi._id, _.omit( mockapi, [ '_id' ] ) ).then( () => {
                return mockDao.getMockApis( mockapi._id, mockapi.userId ).then( (
                    results ) => {
                    expect( results ).to.have.length( 1 );
                    expect( results[ 0 ].url ).to.equals( mockapi.url );
                    expect( results[ 0 ].result ).to.equals( mockapi.result );
                    expect( results[ 0 ].dataHandler ).to.equals( mockapi.dataHandler );
                    expect( results[ 0 ].type ).to.equals( mockapi.type );
                    expect( results[ 0 ].isreg ).to.be.false;
                    expect( results[ 0 ].param ).to.equals( mockapi.param );
                    expect( results[ 0 ].active ).to.be.false;
                    done();
                } );
            } ).catch( done );
        } )
    } )

    describe( '#deleteMockApi', () => {
        it( 'delete mockapi with no id', ( done ) => {
            mockDao.deleteMockApi( null, mockapi.userId ).then( null, ( err ) => {
                expect( err ).to.be.instanceof( Errors.UnknownError );
                done();
            } ).catch( done );
        } )
        it( 'delete mockapi with no user id', ( done ) => {
            mockDao.deleteMockApi( mockapi._id, undefined ).then( null, ( err ) => {
                expect( err ).to.be.instanceof( Errors.UnknownError );
                done();
            } ).catch( done );
        } )
        it( 'delete mockapi ', ( done ) => {
            mockDao.deleteMockApi( mockapi._id, mockapi.userId ).then( () => {
                done();
            } ).catch( done );
        } )
    } )

    after( ( done ) => {
        projectDao.deleteProject( project._id, project.userId ).then( ( results ) => {
            userDao.remove( user ).then( ( results ) => {
                done();
            } ).catch( done );
        } ).catch( done );
    } )

} )
