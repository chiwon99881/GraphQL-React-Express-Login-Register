import React from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import {AUTH} from './queries';

const Container = styled.div`
    position:absolute;
    display:flex;
    align-items:center;
    justify-content:center;
    background-color:rgba(0,0,0,0.25);
    width:100%;
    height:100%;
`;

const Card = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
    background-color:#54a0ff;
    width:300px;
    height:400px;
`;

const Font = styled.h1`
    @import url('https://fonts.googleapis.com/css?family=Ubuntu');
    all:unset;
    color:white;
    font-family: 'Ubuntu', sans-serif;
    font-size:50px;
`;

const Button = styled.button`
    all:unset;
    margin-top:20px;
    border-radius:20px;
    padding:15px;
    text-align:center;
    background-color:white;
    color:#54a0ff;
    cursor:pointer;
`;
const Login = ({history}) => {
    return (
        <Query query={AUTH}>{({loading,error,data}) => {
            if(loading) return 'Loading'
            else if(error) return error
            else {
                if(data.isLoggedIn) {
                    return (                        
                    <Container>
                        <Card>
                            <Font>Logout</Font>
                            <Button onClick={() => {history.push('/logout')}}>Log Out</Button>
                        </Card>
                    </Container>
                    )
                }else {
                    return (
                        <Container>
                        <Card>
                            <Font>Login</Font>
                        </Card>
                    </Container>
                    );
                }
            }
        }}</Query>
    );
}

export default Login;

