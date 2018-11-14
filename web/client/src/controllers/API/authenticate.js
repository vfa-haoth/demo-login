import gql from 'graphql-tag';
import GraphQLController from './../graphql';

export default class APIAuthenticateControllers {
    constructor() {
        this.graphQLController = new GraphQLController();
    }

    async signIn(params) {
        var app_query = gql`
            mutation {
                userSignin ( 
                    username : "${params.username}",
                    password : "${params.password}"
                ) {
                    username
                    age
                    tel
                    email
                    token
                }
            }
        `

        var result = this.graphQLController.mutate(app_query);
        
        return result.then((val) => {
            if (val.success) {
                if (val.data.userSignin) {
                    localStorage.setItem('userData', JSON.stringify(val.data.userSignin))
                    console.log("sign in success")
                    return { success: true, data: val.data.userSignin }
                }
            }else {
                console.log("failed")
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
            data = {success : true, userInfo : {
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