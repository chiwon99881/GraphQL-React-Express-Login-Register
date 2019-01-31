import React from 'react';
import { Query } from 'react-apollo';
import {LOGOUT} from './queries';
import {Redirect} from 'react-router-dom';

const Logout = () => {
    return (
        <Query query={LOGOUT}>{({loading,error,data}) => {
            if(loading) return 'loading';
            if(error) return 'error';
            else {
               return (<div>{data.logout && <Redirect to="/" />}</div>)
            }
        }}</Query>
    );
}

export default Logout;