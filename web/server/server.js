const express = require('express');
const { ApolloServer} = require('apollo-server-express');
const jwt = require('express-jwt');
const User = require('./src/models/users');
const mongoose = require('./src/config/mongoose');
const db = mongoose();
const schema = require('./src/graphql');
const server = new ApolloServer({schema});
const app = express();
const expressGraphQL = require('express-graphql');
const cors = require('cors');

app.use(cors());

app.use('/graphql', jwt({
    secret: 'process.env.JWT_SECRET_KEY',
    requestProperty: 'authenticate',
    credentialsRequired: false
}))

app.use('/graphql', (req, res, done) => {
    console.log('graphql on');
    var userID = (req.authenticate && req.authenticate.id) ? req.authenticate.id : undefined;
    console.log(userID);
    const user = (userID) ? User.findById(userID) : undefined;
    req.context = {
        user : user
    }
    console.log(user);
    done();
})

app.use('/graphql', expressGraphQL( (req) => ({
    schema : schema,
    context : req.context,
    graphiql : true
})))

server.applyMiddleware({app});

const PORT = 3333;
const serverListen = app.listen({port : PORT}, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
})