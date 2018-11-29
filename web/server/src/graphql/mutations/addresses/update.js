var { GraphQLNonNull, GraphQLString, GraphQLID } = require('graphql');
var AddressType = require('./../../types/address');
var AddressModel = require('./../../../models/addresses');

exports.update = {
    type: AddressType.addressType,
    args: {
        _id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLID)
        },
        code: {
            type: GraphQLString,
            required: false
        },
        street: {
            type: GraphQLString,
            required: false
        },
        ward: {
            type: GraphQLString,
            required: false
        },
        district: {
            type: GraphQLString,
            required: false
        },
        city: {
            type: GraphQLString,
            required: false
        }
    },
    resolve(root, params) {
        console.log(params)
        return AddressModel.findByIdAndUpdate(
            { _id: params._id },
            {
                $set: {
                    "code": params.code,
                    "street": params.street,
                    "ward": params.ward,
                    "district": params.district,
                    "city": params.city
                }
            },
            { new: true }
        )
    }
}