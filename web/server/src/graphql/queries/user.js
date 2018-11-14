var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var UserModel = require('./../../models/users');
var userType = require('./../types/user').userType;

exports.queryType = new GraphQLObjectType({
    name : 'Query',
    fields : function () {
        return {
            users: {
                type : new GraphQLList(userType),
                resolve : function () {
                    const users = UserModel.find().exec();
                    const count = UserModel.count().exec();
                    
                    console.log(count)

                    if(!users) {
                        throw new Error('Error');
                    }

                    return users;
                }
            }
        }
    }
})