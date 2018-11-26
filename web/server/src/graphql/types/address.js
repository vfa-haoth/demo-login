let {GraphQLString, GraphQLObjectType, GraphQLID, GraphQLNonNull} = require('graphql')

exports.addressType = new GraphQLObjectType({
    name: 'Address',
    fields: function () {
        return {
            _id:{type: new GraphQLNonNull(GraphQLID)},
            code: { type: GraphQLString },
            street: { type: GraphQLString },
            ward: { type: GraphQLString },
            district : { type: GraphQLString },
            city : {type : GraphQLString}
        }
    }
})