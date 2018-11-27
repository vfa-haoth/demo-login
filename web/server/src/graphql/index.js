var { GraphQLObjectType, GraphQLSchema, GraphQLSchema } = require('graphql');
var { query } = require('./queries');
var mutation = require('./mutations');

const AppSchema = new GraphQLSchema({
    query: query,
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: mutation
    })
})

module.exports = AppSchema;