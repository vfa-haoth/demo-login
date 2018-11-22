var {GraphQLObjectType, GraphQLList, GraphQLString} = require('graphql')

var UserModel = require('./../../models/users');
var userType = require('./../types/user').userType;

var AddressModel = require('./../../models/addresses');
var addressType = require('./../types/address').addressType;

const root = new GraphQLObjectType({
    name : 'Query',
    fields : {
        users : {
            type : new GraphQLList(userType),
            resolve : function() {
                const users = UserModel.find().exec();
                
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
                    required : true
                }
            },
            resolve: function (root, {_id}) {
                const data = UserModel.find({_id})
                .populate('addressIDs', '_id code street ward district city userID')
                .exec()
                
                if(!data){
                    throw new Error('Error');
                }
                return data;
            }
        },
        addresses : {
            type : new GraphQLList(addressType),
            resolve : function() {
                const addresses = AddressModel.find().exec();
                const count = AddressModel.countDocuments().exec();
                count.then(data => {
                    console.log(data)
                })
                console.log(JSON.stringify(addresses));
                if(!addresses) {
                     throw new Error('Error')
                }

                return addresses;
            }
        },
        addressDetail : {
            type : new GraphQLList(addressType),
            args : {
                userID : {
                    type : GraphQLString,
                    required : true
                }
            },
            resolve : function(root, {userID}) {
                const data = AddressModel.find({userID}).exec()
                if(!data){
                    throw new Error("Error")
                }
                return data;
            }
        }
    }
})

exports.queryType = root;