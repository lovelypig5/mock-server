var simpleOauth2 = require( "simple-oauth2" ),
    dict = require( "../config/dict" );
var request = require( "request-promise" );

const credentials = {
    client: {
        id: "6gHUa2RC34Ouh5x4trRFKz066My3p8kf",
        secret: "DJjb6wcw0Uhasrr1fZGygcXgkiJ9o8YLQmmDg5CA4MQeP60q4YvZAF1LyZHHUBQw"
    },
    auth: {
        tokenHost: "https://oauth.agoralab.co"
    }
};
const oauth2 = simpleOauth2.create( credentials );

class OAuth2 {

    async doOauth2( res, url ) {
        const authorizationUri = await oauth2.authorizationCode.authorizeURL( {
            redirect_uri: dict.OAuth2,
            scope: "<scope>",
            state: url
        } );
        res.redirect( authorizationUri );
    }

    async getToken( code ) {
        const tokenConfig = {
            code: code,
            redirect_uri: dict.OAuth2,
            scope: "<scope>",
        };

        return await oauth2.authorizationCode.getToken( tokenConfig );
    }

    async getUserInfo( accessToken ) {
        return await request( {
            url: "https://oauth.agoralab.co/api/userInfo",
            headers: {
                "Authorization": "Bearer " + accessToken
            },
            json: true
        } )
    }
}

module.exports = new OAuth2();