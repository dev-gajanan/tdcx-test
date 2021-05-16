'use strict';
const winston = require('winston');

require('express-async-errors');

module.exports = () => {
    process.on('uncaughtExceptioon', (exception) => {
        winston.error(exception.message, exception);
        process.exit(1);
    });

    process.on('unhandledRejection', (exception) => {
        winston.error(exception.message, exception);
        process.exit(1);
    });

    winston.add(winston.transports.File, {filename: 'access.log'});
}