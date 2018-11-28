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

const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

var inputAddress = new GraphQLInputObjectType({
    name: 'addressInput',
    fields: {
        _id: {
            type: GraphQLID,
            required: true
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
        address : {
            type : new GraphQLList(inputAddress)
        }
    },
    resolve(root, params) {
        return UserModel.findByIdAndUpdate(
            { _id: params.id },
            {
                $push: {
                    "addressIDs": params.address
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
            type: new GraphQLList(inputAddress),
        },
    },
    resolve(root, params) {
        console.log(params)
        return UserModel.findByIdAndUpdate(
            {
                _id: params._id
            },
            {
                $set: {
                    "addressIDs": params.addressIDs
                }
            },
            { new: true }
        )
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