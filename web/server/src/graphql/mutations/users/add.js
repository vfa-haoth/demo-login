var {GraphQLNonNull, GraphQLString} = require('graphql');
var UserType = require('./../../types/user');
var UserModel = require('./../../../models/users');

exports.add = {
    type : UserType.userType,
    args : {
        username : {
            type: new GraphQLNonNull(GraphQLString),
            required: true
        },
        password : {
            type: new GraphQLNonNull(GraphQLString),
            required: true
        },
        age : {
            type: GraphQLString,
            required : false
        },
        tel : {
            type : GraphQLString,
            required : true
        },
        email : {
            type : new GraphQLNonNull(GraphQLString),
            required : true
        }
    },
    resolve(root, params) {
        const userModel = new UserModel(params);
        const newUser = userModel.save();

        if(!newUser) {
            throw new Error('Error!')
        }

        return newUser;
    }
}