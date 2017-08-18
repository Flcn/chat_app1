import React from 'react';
import InputText from './InputText';
import PropTypes from 'prop-types';


class ChatInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chatInput: this.props.inputText
        };
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onSend(this.props.inputText);
    };

    render() {
        return (
            <form onSubmit={this.submitHandler}>
                <InputText
                    onChange={this.props.onChange}
                    value={this.props.inputText}
                    type="chat"
                />
            </form>
        );
    }
}

ChatInput.propTypes = {
    onChange: PropTypes.func.isRequired,
    charsLeft: PropTypes.number.isRequired
};

export default ChatInput;