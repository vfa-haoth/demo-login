var { GraphQLNonNull, GraphQLString } = require('graphql');
var UserType = require('./../../types/user');
var UserModel = require('./../../../models/users');

const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

exports.update = {
    type: UserType.userType,
    args: {
        id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLString)
        },
        username: {
            type: GraphQLString,
            required: true
        },
        password: {
            type: GraphQLString,
            required: true
        },
        age: {
            type: GraphQLString,
            required: false
        },
        tel: {
            type: GraphQLString,
            required: true
        },
        email: {
            type: GraphQLString,
            required: true
        }
    },
    resolve(root, params) {
        return UserModel.findByIdAndUpdate(
            params.id,
            {
                $set: {
                    username: params.username
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