import React, { Component } from 'react';
import client from './apolloClient';
import { ApolloProvider } from 'react-apollo';
import {HashRouter as Router,Route} from 'react-router-dom';
import Header from './components/Header';
import Home from './Home';
import Login from './Login';
import Logout from './Logout';

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <React.Fragment>
            <Header />
            <Route exact={true} path={"/"} component={Home} />
            <Route path={"/login"} component={Login} />
            <Route path={"/logout"} component={Logout} />
          </React.Fragment>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
