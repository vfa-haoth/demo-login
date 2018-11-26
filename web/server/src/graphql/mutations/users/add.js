var { GraphQLList, GraphQLString, GraphQLID } = require('graphql');
var UserType = require('./../../types/user');
var UserModel = require('./../../../models/users');

exports.add = {
    type: UserType.userType,
    args: {
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
        },
        addressIDs: {
            type: new GraphQLList(GraphQLID),
            required: false
        }
    },
    resolve(root, params) {
        const userModel = new UserModel(params);
        const newUser = userModel.save();

        if (!newUser) {
            throw new Error('Error!')
        }

        return newUser;
    }
}