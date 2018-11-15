var env = process.env.NODE_ENV || 'development',
    config = require('./config')[env],
    mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = function () {
    mongoose.Promise = global.Promise;
    var db = mongoose.connect(config.db);
    mongoose.connection.on('error', function (error) {
        console.log('Error: Could not connect to MongoDB. Did you forget to run `mongod`?'.red);
    }).on('open', function () {
        console.log('Connection extablised with MongoDB')
    })
    ObjectId.prototype.valueOf = function () {
        return this.toString();
    };
    return db;
}