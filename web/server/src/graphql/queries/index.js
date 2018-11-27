var { users, userDetail } = require('./users');
var { addresses, addressDetail } = require('./addresses');
var { GraphQLObjectType } = require('graphql')

const root = new GraphQLObjectType({
    name: 'Query',
    fields: {
        users,
        userDetail,
        addresses,
        addressDetail
    }
})

exports.query = root;