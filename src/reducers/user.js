import {SET_USER_INFO, GET_USER_INFO} from '../actions/types';


export default (state = {}, action={}) => {
    switch (action.type) {
        case SET_USER_INFO:
            return {
                history: action.payload.history,
                username: action.payload.username,
                socket: action.payload.socket
            };
        case GET_USER_INFO:
            return {
                history: action.payload.history,
                selectedUser: action.payload.selectedUser,
                userMessages: action.payload.userMessages,
                username: action.payload.username,
            };
        default:
            return [];
    }
}