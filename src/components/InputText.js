import React from 'react';
import PropTypes from 'prop-types';

class InputText extends React.Component {
    createChatInput(){
        return (
            <div>
                <input className="chat-input"
                       type="text"
                       onChange={this.props.onChange}
                       value={this.props.value}
                       placeholder="Введите сообщение..."
                       required />
            </div>
        )
    }

    createBaseInput(){
        return (
            <div>
                <input
                    className="base-input"
                    type="text"
                    onChange={this.props.onChange}
                    placeholder={this.props.placeholder}
                    required
                />
            </div>
        );
    }

    render() {
        let type = this.props.type;
        if (type === "chat") {
            return this.createChatInput();
        }
        return this.createBaseInput();
    }
}

InputText.propTypes = {
    onChange: PropTypes.func.isRequired
};

export default InputText;