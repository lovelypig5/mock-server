var DICT = require('./dict');

module.exports = {
    DB: {
        dialect: DICT.DB.MONGO,
        host: '127.0.0.1',
        port: 27017,
        user: '',
        password: '',
        schema: 'test'
    },
    APIPATH: '_system'
};
