var addUser = require('./add').add;
var updateUser = require('./update').update;
var userSignin = require('./update').signin;
var removeUser = require('./remove').remove;

module.exports = {
    addUser,
    updateUser,
    userSignin,
    removeUser
}