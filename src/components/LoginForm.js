import React from 'react';
import InputText from './InputText';


class LoginForm extends React.Component {
    render(){
        return (
            <form onSubmit={this.props.onSubmit} className="username-container">
                <h1>Реактивный чат</h1>
                <InputText onChange={this.props.onChange}
                       placeholder="Введите свое имя..."
                />
                <input className="login-button" type="submit" value="Войти"/>
            </form>
        );
    }
}

export default LoginForm;