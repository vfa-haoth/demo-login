let { GraphQLString, GraphQLID, GraphQLObjectType, GraphQLNonNull, GraphQLList } = require('graphql')

var AddressType = require('./../types/address').addressType;

exports.userType = new GraphQLObjectType({
    name: 'Users',
    fields: function () {
        return {
            _id: { type: new GraphQLNonNull(GraphQLID) },
            username: { type: new GraphQLNonNull(GraphQLString) },
            password: { type: new GraphQLNonNull(GraphQLString) },
            age: { type: GraphQLString },
            tel: { type: GraphQLString },
            email: { type: new GraphQLNonNull(GraphQLString) },
            addresses : {type : new GraphQLList(AddressType)},
            token: {
                type: GraphQLString,
                description: 'Status of user, whether active or disable',
            }
        }
    }
})