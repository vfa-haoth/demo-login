import gql from 'graphql-tag';
import GraphQLControllers from './../graphql';

export default class APIControllers {
    constructor() {
        this.graphQLController = new GraphQLControllers();
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
            } else {
                console.log("failed")
            }
            return { success: false }
        })
    }

    async saveAddress(params) {
        console.log(params);
        var app_query = gql`
            mutation {
                addAddress (
                    code : "${params.code}",
                    street : "${params.street}",
                    ward : "${params.ward}",
                    district : "${params.district}",
                    city : "${params.city}"
                ) {
                    _id
                    code
                    street
                    ward
                    district
                    city
                }
            }
        `

        var result = this.graphQLController.mutate(app_query);
        return result.then((val) => {
            if (val.success) {
                return { success: true, data: val.data.addAddress }
            } else {
                console.log("failed")
            }
            return { success: false }
        })
    }

    async updateAddress(params) {
        console.log(params)
        var app_query = gql`
            mutation {
                updateAddress (
                    id : "${params.userID}",
                    _id : "${params.id}",
                    code : "${params.code}",
                    street : "${params.street}",
                    ward : "${params.ward}",
                    district : "${params.district}",
                    city : "${params.city}"
                ) {
                    _id
                }
            }
        `

        var result = this.graphQLController.mutate(app_query);

        return result.then((val) => {
            if (val.success) {
                return { success: true }
            } else {
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
                    username
                    age
                    tel
                    email
                    addressIDs{
                        _id
                        code
                        street
                        ward
                        district
                        city
                    }
                }
            }
        `

        var result = this.graphQLController.query(app_query)

        return result.then((val) => {
            if (val.success) {
                if (val.data.userDetail) {
                    return { success: true, userData: val.data.userDetail }
                }
            }
            return { success: false }
        })
    }
}