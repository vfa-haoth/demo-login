var { GraphQLList, GraphQLString, GraphQLID } = require('graphql');
var AddressType = require('./../../types/address');
var AddressModel = require('./../../../models/addresses');
var UserType = require('./../../types/user');

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
        },
        userID: {
            type: GraphQLID,
            required : true,
            resolve: (UserType) => UserType._id
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