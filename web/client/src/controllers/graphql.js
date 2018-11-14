import ApolloClient from 'apollo-boost';
import Config from './../configs/config';

export default class GraphQLControllers {
    client(key_cache) {
        let token = null;
        let userData = JSON.parse(localStorage.getItem('userData'))

        if (userData != null) {
            token = userData.token;
        }

        return new ApolloClient({
            uri: Config.graphql_url,
            request: operation => {
                operation.setContext({
                    headers: {
                        authorization: token ? `Bearer ${token}` : "",
                        key_cache_post: `${key_cache}`
                    }
                })
            }
        })
    }

    async query(app_query) {
        return await this.client(JSON.stringify(app_query)).query({ query: app_query })
            .then((data) => {
                return { success: true, data: data.data }
            }).catch((error) => {
                return { success: false, error: error }
            })
    }

    async mutate(mutate) {
        return await this.client('').mutate({mutation : mutate})
            .then( (data) => {
                return {success : true, data : data.data}
            }).catch ( (error) => {
                return {success : false, error : error}
            })
    }
}