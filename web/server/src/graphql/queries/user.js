var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLString = require('graphql').GraphQLString;
var UserModel = require('./../../models/users');
var userType = require('./../types/user').userType;

exports.userQuery = new GraphQLObjectType({
    name: 'Query',
    fields: {
        users: {
            type: new GraphQLList(userType),
            resolve: function () {
                const users = UserModel.find().exec();

                if (!users) {
                    throw new Error('Error')
                }

                return users;
            }
        },
        userDetail: {
            type: new GraphQLList(userType),
            args: {
                _id: {
                    type: GraphQLString,
                    required: true
                }
            },
            resolve: function (root, { _id }) {
                const data = UserModel.find({ _id })
                    .populate('addressIDs', '_id code street ward district city userID')
                    .exec()

                if (!data) {
                    throw new Error('Error');
                }
                return data;
            }
        }
    }
})