// this is to connect the database to out project

const mongoose = require('mongoose');

const connection = mongoose.connect('mongodb://0.0.0.0/user').then(() => {
    console.log('connected to database');
});

module.exports = connection