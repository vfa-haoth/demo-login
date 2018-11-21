var addUser = require('./add').add;
var updateAddress = require('./update').update;
var userSignin = require('./update').signin;
var removeUser = require('./remove').remove;

module.exports = {
    addUser,
    updateAddress,
    userSignin,
    removeUser
}