var {addUser, updateAddress, removeUser, userSignin} = require('./users');
var {addAddress} = require('./addresses');

module.exports = {
    addUser,
    updateAddress,
    userSignin,
    removeUser,
    addAddress,
}