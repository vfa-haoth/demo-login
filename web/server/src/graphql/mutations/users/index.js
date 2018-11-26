var addUser = require('./add').add;
var updateAddress = require('./update').update;
var userSignin = require('./update').signin;

module.exports = {
    addUser,
    updateAddress,
    userSignin
}