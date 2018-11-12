import ApolloClient from 'apollo-boost';
import Config from './../configs/config';

export default class GraphQLControllers {
    client(key_cache) {
        let token = null;
        let userData = JSON.parse(localStorage.getItem('userData'))
        
        if(userData != null) {
            token = userData.token;
        }

        return new ApolloClient({
            url : Config.graphql_url,
            request : operation => {
                operation.setContext({
                    headers : {
                        authorization : token ? `Bearer ${token}` : "",
                        key_cache_post : `${key_cache}`
                    }
                })
            }
        })
    }
}