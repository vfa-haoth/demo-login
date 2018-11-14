var { GraphQLObjectType, GraphQLSchema } = require('graphql');
var { queryType } = require('./queries');
var mutation = require('./mutations');

const AppSchema = new GraphQLSchema({
    query: queryType,
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: mutation
    })
})

module.exports = AppSchema;