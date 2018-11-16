var {addUser, updateUser, removeUser, userSignin} = require('./users');
var {addAddress} = require('./addresses');

module.exports = {
    addUser,
    updateUser,
    userSignin,
    removeUser,
    addAddress,
}