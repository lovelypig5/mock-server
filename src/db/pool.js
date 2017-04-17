// var mysql = require('mysql');
var mongoose = require('mongoose'),
    config = require('../config'),
    DICT = require('../config/dict'),
    logger = require('../logger');

var pool;
var {
    dialect = '',
        host,
        port,
        user,
        password,
        schema
} = config.DB;

switch (dialect) {
case DICT.DB.MONGO:
    var connectStr = `mongodb://${user ? (user + ':' + password + '@') : ''}${host}${port ? (':' + port) : ''}${schema ? '/' + schema : ''}?authSource=admin`;
    pool = mongoose.connect(connectStr, (err) => {
        if (err) {
            logger.error(err);
        }
    });
    break;
default:
    logger.error('No dialect found in config/db.js!');
    break;
}
//
// var pool = mysql.createPool({
//     connectionLimit: 10,
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'wms'
// });

process.on('exit', (code) => {
    pool.end();
    logger.info(`system exit with code ${code}`);
})

module.exports = pool;
