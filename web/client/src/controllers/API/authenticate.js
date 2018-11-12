import gql from 'graphql-tag';
import GraphQLController from './../graphql';

export default class APIAuthenticataControllers {
    constructor() {
        this.graphqlController = new GraphQLController();
    }

    async signIn(params) {
        var app_query = gql`
            mutation {
                memberSignIn ( 
                    username : "${params.username}",
                    password : "${params.password}"
                ) {
                    _id
                    username
                    token
                }
            }
        `
    }
}