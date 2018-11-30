var {
    GraphQLNonNull,
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLObjectType,
    GraphQLInputObjectType
} = require('graphql');
var UserType = require('./../../types/user');
var UserModel = require('./../../../models/users');
var AddressType = require('./../../types/address');
var AddressModel = require('./../../../models/addresses');

const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

var inputAddress = new GraphQLInputObjectType({
    name: 'addressInput',
    fields: {
        _id: {
            type: GraphQLID,
            required: false
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
    }
})

exports.addAddress = {
    type: UserType.userType,
    args: {
        id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLID)
        },
        addressIDs: {
            type: inputAddress
        }
    },
    resolve(root, params) {
        return UserModel.findByIdAndUpdate(
            { _id: params.id },
            {
                $push: {
                    "addressIDs": params.addressIDs
                }
            },
            { new: true }
        )
    }
}

exports.updateAddressFromUser = {
    type: UserType.userType,
    args: {
        _id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLID)
        },
        addressIDs: {
            type: inputAddress,
        },
    },
    resolve(root, params) {
        console.log(params)
        var model = AddressModel.findByIdAndUpdate(
            { _id: params.addressIDs._id },
            {
                $set: {
                    code: params.addressIDs.code,
                    street: params.addressIDs.street,
                    ward: params.addressIDs.ward,
                    district: params.addressIDs.district,
                    city: params.addressIDs.city,
                }
            },
            { new: true }
        ).then(res => {
            return UserModel.findOneAndUpdate(
                {
                    "addressIDs._id": params.addressIDs._id
                },
                {
                    $set: {
                        "addressIDs.$": params.addressIDs
                    }
                },
                { new: true }
            ).exec();
        })

        return model
    }
}

exports.signin = {
    type: UserType.userType,
    args: {
        username: { type: GraphQLString, required: false },
        password: { type: GraphQLString, required: false }
    },
    resolve(root, params) {
        return UserModel.findOne({ username: params.username })
            .exec()
            .then((user) => {

                if (!user) {
                    return null
                }

                if (bcrypt.compareSync(params.password, user.password)) {
                    const payload = { id: user._id, username: user.username }
                    let userObject = user.toJSON()
                    const token = jwt.sign(payload, 'process.env.JWT_SECRET_KEY')
                    userObject['token'] = token;
                    return userObject;
                } else {
                    return null;
                }
            }).catch((error) => {
                return null;
            })
    }
}