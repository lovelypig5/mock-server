var expect = require( 'chai' ).expect,
    _ = require( 'lodash' ),
    config = require( '../../src/config' ),
    userDao = require( `../../src/dao/${config.DB.dialect}/userDao` ),
    projectDao = require( `../../src/dao/${config.DB.dialect}/projectDao` ),
    Errors = require( '../../src/error' );

var CONST = require( '../config' ),
    user = CONST.user,
    project = CONST.project;

describe( 'ProjectDao Test', () => {

    before( ( done ) => {
        userDao.register( user ).then( ( _user ) => {
            user = Object.assign( _user.toJSON(), user );
            project.userId = user._id;
            done();
        } ).catch( done );
    } )

    describe( '#createProject()', () => {
        it( 'create empty project', ( done ) => {
            projectDao.createProject( {} ).then( null, ( err ) => {
                expect( err ).to.have.any.keys( 'errors' );
                done();
            } ).catch( done );
        } );
        it( 'create project without name', ( done ) => {
            projectDao.createProject( _.omit( project, [ 'name' ] ) ).then( null, ( {
                errors
            } ) => {
                expect( errors[ 'name' ].message ).to.equal(
                    'Path `name` is required.' );
                done();
            } ).catch( done );
        } );
        it( 'create project without beginPath', ( done ) => {
            projectDao.createProject( _.omit( project, [ 'beginPath' ] ) ).then( null, ( {
                errors
            } ) => {
                expect( errors[ 'beginPath' ].message ).to.equal(
                    'Path `beginPath` is required.' );
                done();
            } ).catch( done );
        } );
        it( 'create project without proxy', ( done ) => {
            projectDao.createProject( _.omit( project, [ 'proxy' ] ) ).then( null, ( {
                errors
            } ) => {
                expect( errors[ 'proxy' ].message ).to.equal(
                    'Path `proxy` is required.' );
                done();
            } ).catch( done );
        } );
        it( 'create project without userId', ( done ) => {
            projectDao.createProject( _.omit( project, [ 'userId' ] ) ).then( null, ( {
                errors
            } ) => {
                expect( errors[ 'userId' ].message ).to.equal(
                    'Path `userId` is required.' );
                done();
            } ).catch( done );
        } );
        it( 'create project', ( done ) => {
            projectDao.createProject( project ).then( ( _project ) => {
                project = Object.assign( _project.toJSON(), project );
                done();
            } ).catch( done );
        } );
    } );

    describe( '#listProject', () => {
        it( 'list project with no id', ( done ) => {
            projectDao.listProject( null, project.userId ).then( ( results ) => {
                expect( results ).to.not.have.length.below( 1 );
                done();
            } ).catch( done );
        } );
        it( 'list project with id', ( done ) => {
            projectDao.listProject( project._id, project.userId ).then( ( results ) => {
                expect( results ).to.have.length( 1 );
                done();
            } ).catch( done );
        } );
    } );

    describe( '#modifyProject', () => {
        it( 'modify project with no id', ( done ) => {
            projectDao.modifyProject( null, _.omit( project, [ '_id' ] ) ).then( null,
                ( err ) => {
                    expect( err ).to.be.instanceof( Errors.UnknownError );
                    done();
                } ).catch( done );
        } );

        it( 'modify project with no user id', ( done ) => {
            projectDao.modifyProject( project._id, _.omit( project, [ '_id', 'userId' ] ) ).then(
                null, ( err ) => {
                    expect( err ).to.be.instanceof( Errors.UnknownError );
                    done();
                } ).catch( done );
        } );

        it( 'modify project with new project', ( done ) => {
            project = Object.assign( project, {
                name: 'ci modify project',
                desc: 'ci modify project for test use',
                beginPath: '/ci_modify',
                proxy: 'http://www.baidu.com',
                isPublic: 0,
                modifyTime: Date.now()
            } );
            projectDao.modifyProject( project._id, _.omit( project, [ '_id' ] ) ).then(
                () => {
                    return projectDao.listProject( project._id, project.userId ).then( (
                        results ) => {
                        expect( results ).to.have.length( 1 );
                        expect( results[ 0 ].name ).to.equals( project.name );
                        expect( results[ 0 ].desc ).to.equals( project.desc );
                        expect( results[ 0 ].beginPath ).to.equals( project.beginPath );
                        expect( results[ 0 ].proxy ).to.equals( project.proxy );
                        expect( results[ 0 ].isPublic ).to.equals( project.isPublic );
                        done();
                    } );
                } ).catch( done );
        } );
    } );

    describe( '#deleteProject', () => {
        it( 'delete project with no userId', ( done ) => {
            projectDao.deleteProject( null, null ).then( null, ( err ) => {
                expect( err ).to.be.instanceof( Errors.UnknownError );
                done();
            } ).catch( done );
        } );
        it( 'delete project with no id', ( done ) => {
            projectDao.deleteProject( null, project.userId ).then( null, ( err ) => {
                expect( err ).to.be.instanceof( Errors.UnknownError );
                done();
            } ).catch( done );
        } );
        it( 'delete created project', ( done ) => {
            projectDao.deleteProject( project._id, project.userId ).then( ( results ) => {
                done();
            } ).catch( done );
        } );
    } );

    after( ( done ) => {
        userDao.remove( user ).then( () => {
            done();
        } ).catch( done );
    } )
} );
