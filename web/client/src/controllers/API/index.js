import gql from 'graphql-tag';
import GraphQLControllers from './../graphql';

export default class APIControllers {
    constructor() {
        this.graphQLController = new GraphQLControllers();
    }

    getListOfUsersData(params = null) {
        var app_query = gql`
            query {
                usersList {
                    _id
                    username
                    age
                    tel
                    email
                }
            }
        `

        var result = this.graphQLController.query(app_query);

        return result.then((val) => {
            if (val.success) {
                return { success: true, data: val.data.usersList }
            }
            return { success: false }
        })
    }

    async saveUser(params) {
        var app_query = gql`
            mutation {
                addUser (
                    username : "${params.username}",
                    password : "${params.password}",
                    age : "${params.age || ''}",
                    tel : "${params.tel || ''}",
                    email : "${params.email}"
                ) {
                username
                }
            }
        `

        var result = this.graphQLController.mutate(app_query);

        return result.then((val) => {
            if (val.success) {
                return { success: true }
            }else {
                console.log("failed")
            }
            return { success: false }
        })
    }

    getUserData(params = null) {
        let userData = JSON.parse(localStorage.getItem('userData'))
        let userID = '';

        if (userData) {
            userID = userData._id;
        }

        if (params) {
            userID = params._id;
        }

        if (userID === 0) {
            return { success: false }
        }

        var app_query = gql`
            query {
                userDetail (_id : "${userID}") {
                    _id
                    username
                    age
                    tel
                    email
                }
            }
        `

        var result = this.graphQLController.query(app_query)

        return result.then((val) => {
            if (val.success) {
                if (val.data.userDetail) {
                    return { success: true, data: val.data.userDetail }
                }
            }
            return { success: false }
        })
    }
}