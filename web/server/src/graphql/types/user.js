let {GraphQLString, GraphQLID, GraphQLObjectType, GraphQLNonNull} = require('graphql')

exports.userType = new GraphQLObjectType ({
    name : 'Users',
    fields : function(){
        return {
            _id : {type: new GraphQLNonNull(GraphQLID)},
            username : {type: new GraphQLNonNull(GraphQLString)},
            password : {type: new GraphQLNonNull(GraphQLString)},
            age : {type: GraphQLString},
            tel : {type: GraphQLString},
            email : {type: new GraphQLNonNull(GraphQLString)},
            token : {
                type : GraphQLString,
                description : 'Status of user, whether active or disable',
            }
        }
    }
})