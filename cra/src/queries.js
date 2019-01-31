import gql from 'graphql-tag';

export const AUTH = gql`
    {
        isLoggedIn
    }
`;

export const LOGOUT = gql`
    {
        logout
    }
`;