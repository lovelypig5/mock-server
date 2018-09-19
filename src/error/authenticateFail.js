class AuthenticateFail extends Error {
    constructor( message ) {
        super( message );
    }
}

module.exports = AuthenticateFail;
