var {GraphQLObjectType, GraphQLList, GraphQLString} = require('graphql')

var UserModel = require('./../../models/users');
var userType = require('./../types/user').userType;

const root = new GraphQLObjectType({
    name : 'Query',
    fields : {
        users : {
            type : new GraphQLList(userType),
            resolve : function() {
                const users = UserModel.find().exec();
                const count = UserModel.countDocuments().exec();

                count.then( (data) => {
                    console.log(data);
                })

                console.log(JSON.stringify(users));

                if(!users) {
                    throw new Error('Error')
                }

                return users;
            }
        },
        userDetail : {
            type : new GraphQLList(userType),
            args : {
                _id: {
                    type : GraphQLString,
                    require : true
                }
            },
            resolve: function (root, {_id}) {
                const data = UserModel.find({_id}).exec()
                if(!data){
                    throw new Error('Error');
                }
                return data;
            }
        }
    }
})

exports.queryType = root;