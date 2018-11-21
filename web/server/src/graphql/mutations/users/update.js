var { GraphQLNonNull, GraphQLString, GraphQLList } = require('graphql');
var UserType = require('./../../types/user');
var UserModel = require('./../../../models/users');
var AddressType = require('./../../types/address'); 

const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

exports.update = {
    type: UserType.userType,
    args: {
        id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLString)
        },
        addressIDs : {
            type : new GraphQLList(GraphQLString),
            required : false
        }
    },
    resolve(root, params) {
        return UserModel.findByIdAndUpdate(
            params.id,
            {
                $push: {
                    addressIDs: params.addressIDs,
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