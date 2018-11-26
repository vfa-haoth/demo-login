var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var AddressModel = require('./../../models/addresses');
var addressType = require('./../types/address').addressType;

exports.addressQuery = new GraphQLObjectType({
    name : 'Query',
    fields : function() {
        return {
            addresses : {
                type : new GraphQLList(addressType),
                resolve : function() {
                    const addresses = AddressModel.find().exec();
                    
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
    }
})