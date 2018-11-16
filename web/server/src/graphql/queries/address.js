var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var AddressModel = require('./../../models/addresses');
var addressType = require('./../types/address').addressType;

exports.queryType = new GraphQLObjectType({
    name : 'Query',
    fields : function() {
        return {
            addresses : {
                type : new GraphQLList(addressType),
                resolve : function() {
                    const addresses = AddressModel.find().exec();
                    
                    if(!addresses) {
                        throw new Error("Error")
                    }

                    return addresses;
                }
            }
        }
    }
})