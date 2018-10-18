
const logger = require( "../logger" )

const logInject = async ( ctx, next ) => {
    // 挂载log
    ctx.log = logger;
    const reqid = ctx.request.header[ "x-request-id" ];
    logger.addContext( "reqid", reqid );
    const start = +new Date();
    logger.info( `[Start] ${ctx.request.method} ${ctx.request.url}` );
    await next();
    logger.info( `[Completed] ${ctx.status} ${new Date() - start}ms | ${ctx.request.method} ${ctx.request.url}` );
}

module.exports = [
    {
        filter: logInject
    }
]