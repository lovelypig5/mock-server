var NotFound = require('./notFound');
var Exist = require('./exist');
var NotEnough = require('./notEnough');
var DataError = require('./dataError');
var UnknownError = require('./unknownError');

module.exports = {
    NotFound: NotFound,
    Exist: Exist,
    NotEnough: NotEnough,
    DataError: DataError,
    UnknownError: UnknownError
};
