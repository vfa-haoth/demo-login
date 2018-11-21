let { GraphQLString, GraphQLID, GraphQLObjectType, GraphQLNonNull, GraphQLList } = require('graphql')

var AddressType = require('./address').addressType;

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
            addressIDs : {type: new GraphQLList(GraphQLID), resolve: (AddressType) => AddressType._id},
            token: {
                type: GraphQLString,
                description: 'Status of user, whether active or disable',
            }
        }
    }
})