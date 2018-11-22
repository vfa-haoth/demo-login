let {GraphQLString, GraphQLObjectType, GraphQLID, GraphQLNonNull} = require('graphql')
const UserType = require('./user');

exports.addressType = new GraphQLObjectType({
    name: 'Address',
    fields: function () {
        return {
            _id:{type: new GraphQLNonNull(GraphQLID)},
            code: { type: GraphQLString },
            street: { type: GraphQLString },
            ward: { type: GraphQLString },
            district : { type: GraphQLString },
            city : {type : GraphQLString},
            // userID : {type : GraphQLID, resolve: (UserType) => UserType._id}
            // userID : {type : UserType.userType}
        }
    }
})