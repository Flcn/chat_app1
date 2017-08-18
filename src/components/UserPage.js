import React from 'react';
import { connect } from 'react-redux';
import Message from '../components/Message';
import '../styles/Page.css';

class UserPage extends React.Component {
    render() {
        if (!this.props.currentUser || !this.props.username || !this.props.messages) {
            // redirect to login
            this.props.history.push("/");
            return (
                <div className="container">
                    <h3>Потеряно соединение с хранилищем</h3>
                </div>
            );
        }
        const header = this.props.currentUser === this.props.username
            ? "Список ваших сообщений"
            : `Список сообщений пользователя ${this.props.username}`;
        let userMessages = this.props.messages.map((message, i)=> {
            return (
                <Message
                    key={i}
                    username={message.username}
                    message={message.message}
                    fromMe={false}
                    date={message.date}
                    time={message.time}
                    onClick={this.props.onClick}
                />
            );
        });
        return (
            <div className='user-page'>
                <h3>{header}</h3>
                <div className="user-page-messages">
                    {userMessages}
                </div>
            </div>);
    }
}

const mapStateToProps = (state)=> {
    return {
        username: state.user.selectedUser,
        messages: state.user.userMessages,
        currentUser: state.user.username
    }
};

export default connect(mapStateToProps)(UserPage);