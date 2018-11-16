let {GraphQLString, GraphQLObjectType, GraphQLID, GraphQLNonNull} = require('graphql')

exports.addressType = new GraphQLObjectType({
    name: 'Address',
    fields: function () {
        return {
            _id: { type: GraphQLID },
            code: { type: GraphQLString },
            street: { type: GraphQLString },
            ward: { type: GraphQLString },
            district : { type: GraphQLString },
            city : {type : GraphQLString}
        }
    }
})