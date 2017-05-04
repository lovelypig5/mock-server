var expect = require( 'chai' ).expect,
    _ = require( 'lodash' ),
    config = require( '../../src/config' ),
    userDao = require( `../../src/dao/${config.DB.dialect}/userDao` ),
    Errors = require( '../../src/error' );

var registerUser = require( '../config' ).user;

describe( 'UserDao Test', () => {

    describe( '#register', () => {
        it( 'register with empty object', ( done ) => {
            var user = {};
            userDao.register( user ).then( null, ( err ) => {
                expect( err ).to.be.instanceof( TypeError );
                done();
            } ).catch( done );
        } );

        it( 'register with no name', ( done ) => {
            var user = {
                password: '123'
            };
            userDao.register( user ).then( null, ( { errors } ) => {
                expect( errors[ 'name' ].message ).to.equal(
                    'Path `name` is required.' );
                done();
            } ).catch( done );
        } );

        it( 'register with no password', ( done ) => {
            var user = {
                name: 'test'
            };
            userDao.register( user ).then( null, ( err ) => {
                expect( err ).to.be.instanceof( TypeError );
                done();
            } ).catch( done );
        } );

        it( 'register with not a string password', ( done ) => {
            var user = {
                name: 'test',
                password: 123
            };
            userDao.register( user ).then( null, ( err ) => {
                expect( err ).to.be.instanceof( TypeError );
                done();
            } ).catch( done );
        } );

        it( 'register a user', ( done ) => {
            userDao.register( registerUser ).then( ( user ) => {
                registerUser = Object.assign( user.toJSON(), registerUser );
                done();
            } ).catch( done );
        } );
    } )

    describe( '#login()', () => {
        it( 'login with empty object', ( done ) => {
            var user = {};
            userDao.login( user ).then( null, ( err ) => {
                expect( err ).to.be.instanceof( TypeError );
                done();
            } ).catch( done );
        } );
        it( 'login with empty userName', ( done ) => {
            var user = { userName: '' };
            userDao.login( user ).then( null, ( err ) => {
                expect( err ).to.be.instanceof( TypeError );
                done();
            } ).catch( done );
        } );
        it( 'login with empty password', ( done ) => {
            var user = { password: '' };
            userDao.login( user ).then( null, ( err ) => {
                expect( err ).to.be.instanceof( Errors.AuthenticateFail );
                done();
            } ).catch( done );
        } );
        it( 'login with sql inject parameters', ( done ) => {
            var user = { userName: 'test', password: 'a or 1=1' };
            userDao.login( user ).then( null, ( err ) => {
                expect( err ).to.be.instanceof( Errors.AuthenticateFail );
                done();
            } ).catch( done );
        } );
        it( 'login with given user', ( done ) => {
            userDao.login( registerUser ).then( ( result ) => {
                expect( result.toJSON() ).to.have.all.keys( '_id', 'name', 'salt' );
                done();
            } ).catch( done );
        } );
    } );

    describe( '#remove', () => {
        it( 'remove a empty user', ( done ) => {
            userDao.remove( {} ).then( null, ( err ) => {
                expect( err ).to.be.instanceof( Errors.UnknownError );
                done();
            } ).catch( done );
        } );

        it( 'remove a user', ( done ) => {
            userDao.remove( registerUser ).then( ( user ) => {
                registerUser = _.omit( registerUser, [ '_id', 'salt' ] );
                done();
            } ).catch( done );
        } );
    } )

} );
