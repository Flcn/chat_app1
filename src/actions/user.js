import {SET_USER_INFO, GET_USER_INFO} from '../actions/types';


export const setUserInfo = (dispatch, payload)=>{
    return dispatch({
        type: SET_USER_INFO,
        payload
    })
};

export const selectUser = (dispatch, payload) => {
    return dispatch({
        type: GET_USER_INFO,
        payload
    })
};