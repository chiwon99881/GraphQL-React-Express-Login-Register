import React from 'react';
import styled from 'styled-components';

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

const Home = () => {
    return (
        <React.Fragment>
            <Container>
                <Card>
                    <Font>HOME</Font>
                </Card>
            </Container>
        </React.Fragment>
    );
}

export default Home;