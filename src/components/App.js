import React, { Component } from 'react';
import LoginPage from './LoginPage';
import UserPage from './UserPage';
import ChatApp from './ChatApp';
import {Route} from 'react-router';
import './../styles/App.css';


class App extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={LoginPage}/>
                <Route exact path="/chat" component={ChatApp}/>
                <Route exact path="/user" component={UserPage}/>
            </div>
        );
    }
}

export default App;
