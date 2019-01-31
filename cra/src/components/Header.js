import React from 'react';
import styled, {createGlobalStyle} from 'styled-components';
import { Link } from 'react-router-dom';
import { AUTH } from '../queries';
import { Query } from 'react-apollo';
import './Header.css';

const Global = createGlobalStyle`
body {
    padding:0;
    margin:0;
  }
`;

const Container = styled.div`
    @import url('https://fonts.googleapis.com/css?family=Ubuntu');
    font-family: 'Ubuntu', sans-serif;
    background:#70a1ff;
    display:table;
    table-layout:fixed;
    width:100%;
`;

const Header = () => {
    return (
        <Query query={AUTH}>{({loading,error,data}) => {
            if(loading) return 'loading'
            if(error) return 'error'
            else {
                if(data.isLoggedIn) {
                    return (
                <Container>
                    <Global/>
                    <Link to={"/"} className="item">Home</Link>
                    <Link to={"/Login"} className="item">LogOut</Link>
                </Container>
             );
                } else {
                    return (
                        <Container>
                            <Global/>
                            <Link to={"/"} className="item">Home</Link>
                            <Link to={"/Login"} className="item">Login</Link>
                        </Container>
                    );
                }
            }
        }}</Query>
    );
}

export default Header;