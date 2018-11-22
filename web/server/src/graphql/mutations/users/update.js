var { GraphQLNonNull, GraphQLString, GraphQLList, GraphQLID } = require('graphql');
var UserType = require('./../../types/user');
var UserModel = require('./../../../models/users');
var AddressType = require('./../../types/address');
var AddressModel = require('./../../../models/addresses');

const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

exports.update = {
    type: AddressType.addressType,
    args: {
        id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLID)
        },
        _id: {
            type: GraphQLID,
            required: false,
            unique : true
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
        return UserModel.findByIdAndUpdate(
            params.id,
            {
                $push: {
                    "addressIDs": {
                        _id: params._id,
                        code: params.code,
                        street: params.street,
                        ward: params.ward,
                        district: params.district,
                        city: params.city
                    }
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