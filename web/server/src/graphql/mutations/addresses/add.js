var {GraphQLString} = require('graphql');
var AddressType = require('./../../types/address');
var AddressModel = require('./../../../models/addresses');

exports.add = {
    type: AddressType.addressType,
    args: {
        code: {
            type: GraphQLString,
            required: true
        },
        street: {
            type: GraphQLString,
            required: true
        },
        ward: {
            type: GraphQLString,
            required: true
        },
        district: {
            type: GraphQLString,
            required: true
        },
        city: {
            type: GraphQLString,
            required: true
        }
    },
    resolve(root, params) {
        const addressModel = new AddressModel(params);
        const newAddress = addressModel.save();

        if (!newAddress) {
            throw new Error('Error!')
        }

        return newAddress;
    }
}