import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Message extends React.Component {
    constructor(props){
        super(props);
        this.loadUserPage = this.loadUserPage.bind(this);
    }
    loadUserPage = () => {
        this.props.onClick(this.props.username);
    };

    render() {
        const fromMe = this.props.fromMe ? 'from-me' : '';
        const dateStr = `${this.props.date} в ${this.props.time.slice(0, -3)}`;
        const msgHeader = fromMe ? `Вы написали ${dateStr}`: `${this.props.username} написал(а) ${dateStr}`;
        return (
            <div className={`message ${fromMe}`}>
                <div className='username' onClick={this.loadUserPage}>
                    {msgHeader}
                </div>
                <div className='message-body'>
                    { this.props.message }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state)=>{
    return {
        history: state.user.history
    }
};

Message.propTypes = {
    onClick: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(Message);