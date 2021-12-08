import {ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client';
import {setContext} from 'apollo-link-context'
import fetch from 'cross-fetch'
// para el cross-fetch: 
// https://github.com/apollographql/apollo-link/issues/513
// https://github.com/github/fetch#file-upload

const httpLink = new createHttpLink({
    uri: 'http://localhost:4000/graphql',
    fetch,
});

const authLink = setContext((_, {headers}) => {
    // leer el storage
    const token = localStorage.getItem('token');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}`: '',
        }
    }
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
});

export default client;