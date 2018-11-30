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

    async addAddressFromUser(params) {
        console.log(params)
        var app_query = gql`
            mutation {
                addAddressFromUser (
                    id : "${params.userID}",
                    addressIDs : {
                        _id: "${params.id}",
                        code : "${params.code}",
                        street : "${params.street}",
                        ward : "${params.ward}",
                        district : "${params.district}",
                        city : "${params.city}"
                    }
                ) {
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

        var result = this.graphQLController.mutate(app_query);

        return result.then((val) => {
            if (val.success) {
                return { success: true, data: val.data.addAddressFromUser }
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

    async removeCompletelyAddress(address, userID) {
        var app_query = gql`
        mutation{
            removeAddressFromUser(
                _id : "${userID}"
                addressID : "${address}"
            ){
                _id
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
            },
            removeAddress(
                _id: "${address}"
            ){
                _id
            }
        }
        `

        var result = this.graphQLController.mutate(app_query);

        return result.then((val) => {
            if (val.success) {
                return { success: true, userData: val.data.removeAddressFromUser }
            } else {
                console.log("failed")
            }
            return { success: false }
        })
    }

    async removeAddressForUpdate(address, userID){
        var app_query = gql`
        mutation{
            removeAddressFromUser(
                _id : "${userID}"
                addressID : "${address}"
            ){
                _id
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

        var result = this.graphQLController.mutate(app_query);

        return result.then((val) => {
            if (val.success) {
                return { success: true, userData: val.data.removeAddressFromUser }
            } else {
                console.log("failed")
            }
            return { success: false }
        })
    }

    async updateAddress(address, userID) {
        console.log(address)
        var app_query = gql`
            mutation{
                updateAddressFromUser(
                    _id : "${userID}",
                    addressIDs : {
                        _id : "${address._id}",
                        code : "${address.code}",
                        street : "${address.street}",
                        ward : "${address.ward}",
                        district : "${address.district}",
                        city : "${address.city}"
                    }
                ){
                    addressIDs {
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

        var result = this.graphQLController.mutate(app_query);

        return result.then((val) => {
            if (val.success) {
                console.log(val)
                return { success: true, data: val.data.updateAddressFromUser }
            } else {
                console.log("Update failed")
            }
            return { success: false }
        })
    }
}