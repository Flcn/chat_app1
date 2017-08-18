import React from 'react';
import LoginForm from './LoginForm';
import { connect } from 'react-redux';
import {setUserInfo} from '../actions/user';
import  './../styles/Page.css';


class LoginPage extends React.Component {
    onFormSubmit = () => {
        let username = this.userName;
        if (username.replace(/ /g, "") !== "") {
            setUserInfo(this.props.dispatch, {
                history: this.props.history,
                username: username
            });
            this.props.history.push("/chat");
        }
    };
    onInputChange = (event) => {
        this.userName = event.target.value;
    };
    render() {
        return (
            <LoginForm onChange={this.onInputChange} onSubmit={this.onFormSubmit}/>
        )
    }
}


export default connect(null) (LoginPage);