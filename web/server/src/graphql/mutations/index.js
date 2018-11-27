var {
    addUser, 
    addAddressFromUser, 
    userSignin, 
    removeAddressFromUser,
    updateAddressFromUser
} = require('./users');

var {
    addAddress, 
    removeAddress, 
    updateAddress
} = require('./addresses');

module.exports = {
    addUser,
    addAddressFromUser,
    userSignin,
    removeAddressFromUser,
    updateAddressFromUser,

    addAddress,
    removeAddress,
    updateAddress
}