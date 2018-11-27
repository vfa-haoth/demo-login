var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLString = require('graphql').GraphQLString;
var AddressModel = require('../../../models/addresses');
var addressType = require('../../types/address').addressType;

exports.addresses = {
    type: new GraphQLList(addressType),
    resolve: function () {
        const addresses = AddressModel.find().exec();

        if (!addresses) {
            throw new Error('Error')
        }

        return addresses;
    }
}

exports.addressDetail = {
    type: new GraphQLList(addressType),
    args: {
        userID: {
            type: GraphQLString,
            required: true
        }
    },
    resolve: function (root, { userID }) {
        const data = AddressModel.find({ userID }).exec()
        if (!data) {
            throw new Error("Error")
        }
        return data;
    }
}