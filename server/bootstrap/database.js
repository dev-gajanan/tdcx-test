'use strict';

const mongoose = require('mongoose');
const winston = require('winston');
const uri = "mongodb+srv://itmegajanan:Password@123@cluster0.amwoi.mongodb.net/tasks?retryWrites=true&w=majority";
module.exports = () => {
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(() => {
        winston.info("Database connected..");
    })
}