import React from 'react';
import Messages from './Messages';
import ChatInput from './ChatInput';
import InputText from './InputText';
import InfoRow from './InfoRow';
import {selectUser} from '../actions/user';
import {INPUT_MAX_CHARS} from '../const/input-max-chars';
import io from 'socket.io-client';
import {connection} from '../const/socket-config';
import { connect } from 'react-redux';
import './../styles/ChatApp.css';


class ChatApp extends React.Component {
    constructor(props){
        super(props);
        let {username} = this.props;
        if (!username) {
            //todo show error page
            this.props.history.push("/");
            console.error("Произошла ошибка УПС");
        }
        else {
            this.socket = io(connection, {query: `username=${username}`}).connect({reconnect: true});
            this.username = username;
            this.socket.on("server:message", this.getServerMessage);
            this.socket.on('load:server:messages', this.loadHistory);
        }
        this.state = {
            searchValue: "",
            inputText: "",
            charsLeft: INPUT_MAX_CHARS,
            messages: "",
            isLoaded: false
        };
    }

    loadHistory = (serverMessages) => {
        let context = this;
        let history = serverMessages.map((msg)=> {
            return {
                username: msg.username,
                message: msg.message,
                date: msg.date,
                time: msg.time,
                fromMe: msg.username === context.username
            };
        });
        this.setState({isLoaded: true, messages: history});
    };

    sendHandler = (message) => {
        let date = new Date();
        const messageObject = {
            username: this.username,
            message,
            date: date.toLocaleDateString(),
            time: date.toLocaleTimeString(),
            fromMe: true
        };
        this.socket.emit('client:message', messageObject);
        this.addMessage(messageObject);
    };

    addMessage = (message) => {
        const messages = this.state.messages;
        messages.push(message);
        this.setState({messages, inputText:""});
    };

    getServerMessage = (msg) => {
        let messageObject = {
            username: msg.username,
            message: msg.message,
            date: msg.date,
            time: msg.time,
            fromMe: msg.username === this.props.username
        };
        this.addMessage(messageObject);
    };

    onSearchInputChange = (event) => {
        this.setState({searchValue: event.target.value.toLowerCase()});
    };

    chatInputChange = (event) => {
        let charsLeft = INPUT_MAX_CHARS-event.target.value.length;
        if (charsLeft >= 0) {
            this.setState({ inputText: event.target.value, charsLeft});
        }
    };

    showMessages = (filteredMessages) => {
        return (
            <div className="container">
                <h3>Реактивный чат
                    <InputText onChange={this.onSearchInputChange} placeholder="Введите текст для поиска"/>
                </h3>
                <Messages messages={filteredMessages} onClick={this.getUserInfo}/>
                <ChatInput onSend={this.sendHandler}
                           onChange={this.chatInputChange}
                           inputText={this.state.inputText}
                           charsLeft={this.state.charsLeft}
                />
                <InfoRow inputText={this.state.inputText}
                         charsLeft={this.state.charsLeft}
                />
            </div>
        );
    };

    static showLoadingMessages(){
        return (
            <div className="container">
                <h3>Загрузка истории</h3>
            </div>
        );
    }

    getUserInfo = (selectedUser) => {
        let userMessages = this.state.messages.filter(
            item=>{
                return item.username === selectedUser;
            }
        );
        selectUser(this.props.dispatch, {
            history: this.props.history,
            selectedUser: selectedUser,
            userMessages: userMessages,
            username: this.props.username

        });
        this.props.history.push("/user");
    };

    render() {
        if (!this.state.isLoaded || !this.state.messages) {
            return ChatApp.showLoadingMessages();
        }
        let filteredMessages = this.state.messages.filter(
            item=>{
                return (item.message.toLowerCase().indexOf(this.state.searchValue) !== -1) ||
                    (item.username.toLowerCase().indexOf(this.state.searchValue) !== -1);
            }
        );
        return this.showMessages(filteredMessages);
    }
}

const mapStateToProps = (state)=>{
    return {
        username: state.user.username
    }
};

export default connect(mapStateToProps)(ChatApp);