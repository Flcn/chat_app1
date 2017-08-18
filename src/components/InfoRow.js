import React from 'react';
import PropTypes from 'prop-types';

class InfoRow extends React.Component {
    render() {
        if (this.props.inputText) {
            return (
                <div className="chat-info-container">
                    <div className="symbols-used">Использовано символов: {this.props.inputText.length}</div>
                    <div className="symbols-left">Осталось символов: {this.props.charsLeft}</div>
                </div>
            )
        }
        return <div></div>;
    }
}

InfoRow.propTypes = {
    charsLeft: PropTypes.number.isRequired
};

export default InfoRow;