const log4js = require( "log4js" );
log4js.configure( {
    pm2: true,
    appenders: {
        console: {
            type: "console"
        },
        out: {
            type: "stdout",
            layout: {
                type: "pattern",
                pattern: "%[[%x{reqid}] [%d] [%p] %x{type} [%x{user}]%] %m%n",
                tokens: {
                    reqid( logEvent ) {
                        if ( logEvent.context.reqid ) {
                            return `${logEvent.context.reqid}`;
                        }
                        return "";
                    },
                    type( logEvent ) {
                        if ( logEvent.context.type ) {
                            return `[${logEvent.context.type}]`;
                        }
                        return logEvent.categoryName;
                    }
                }
            }
        },
        file: {
            type: "file",
            filename: "logs/access.log",
            maxLogSize: 10485760,
            layout: {
                type: "messagePassThrough"
            },
            compress: true
        }
    },
    categories: {
        "[Logger]": {
            appenders: [ "out" ],
            level: "debug"
        },
        default: {
            appenders: [ "file" ],
            level: "info"
        }
    }
} );
var logger = log4js.getLogger( "[Logger]" );

module.exports = logger;
