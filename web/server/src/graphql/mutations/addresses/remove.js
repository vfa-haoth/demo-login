var { GraphQLNonNull, GraphQLID} = require('graphql');
var AddressType = require('./../../types/address');
var AddressModel = require('./../../../models/addresses');

exports.remove = {
    type : AddressType.addressType,
    args: {
        _id : {
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve(root, params) {
        const removeAddress = AddressModel.findByIdAndRemove(params._id).exec();
        
        if(!removeAddress) {
            throw new Error('Error')
        }

        return removeAddress;
    }
}