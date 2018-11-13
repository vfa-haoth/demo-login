import gql from 'graphql-tag';
import GraphQLController from './../graphql';

export default class APIAuthenticateControllers {
    constructor() {
        this.graphQlController = new GraphQLController();
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
                    age
                    tel
                    email
                    token
                }
            }
        `

        var result = this.graphQlController.mutate(app_query);

        return result.then((val) => {
            if (val.success) {
                if (val.data.memberSignIn) {
                    localStorage.setItem('userData', JSON.stringify(val.data.memberSignIn))
                    return { success: true, data: val.data.memberSignIn }
                }
            }
            return { success: false }
        })
    }

    verifySignIn () {
        let token = null;
        let data = {};
        let userData = JSON.parse(localStorage.getItem('userData'));

        if ( userData != null ) {
            token = userData.token;
            data = {success : true, memberInfo : {
                _id : userData._id,
                username : userData.username,
                age : userData.age,
                tel : userData.tel,
                email : userData.email
            }}
        } else {
            data = {success : false}
        }

        return data;
    }

    verifySignInToRedirect (props) {
        if ( !this.verifySignIn().success ){
            window.location = '/sign-in'
        }
    }

    signOut (props) {
        localStorage.clear();
        window.location = "/";
    }
}