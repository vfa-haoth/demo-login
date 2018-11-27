var addUser = require('./add').add;
var addAddressFromUser = require('./update').addAddress;
var updateAddressFromUser = require('./update').updateAddressFromUser;
var userSignin = require('./update').signin;
var removeAddressFromUser = require('./remove').remove;

module.exports = {
    addUser,
    addAddressFromUser,
    userSignin,
    removeAddressFromUser,
    updateAddressFromUser
}