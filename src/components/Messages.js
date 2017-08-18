import React from 'react';
import Message from './Message';
import PropTypes from 'prop-types';

class Messages extends React.Component {
    componentDidUpdate() {
        // get the messagelist container and set the scrollTop to the height of the container
        const objDiv = document.getElementById('messageList');
        objDiv.scrollTop = objDiv.scrollHeight;
    }

    loadMessages(){
        return this.props.messages.map((message, i) => {
            return (
                <Message
                    key={i}
                    username={message.username}
                    message={message.message}
                    fromMe={message.fromMe}
                    date={message.date}
                    time={message.time}
                    onClick={this.props.onClick}
                />
            );
        });
    }

    render() {
        if (this.props.messages) {
            let messages = this.loadMessages();
            return (
                <div className='messages' id='messageList'>
                    { messages }
                </div>
            );
        }
        else {
            this.props.history.push("/");
            return (<div></div>);
        }
    }
}

Messages.propTypes = {
    onClick: PropTypes.func.isRequired
};

export default Messages;