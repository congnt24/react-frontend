/**
 * Created by congnt on 9/29/18.
 */


"use strict";
import {CLOSE_LOGIN_MODAL, IS_LOGGED, SHOW_LOGIN, SHOW_SIGNUP} from "./types";

const initialState = {};

function userReducer(state = initialState, action) {
    let {type, ...props} = action;
    switch (type) {
        case IS_LOGGED:
            return {...state, is_authenticated: isAuth(), show_modal: undefined, user_data: getUserData()};
        case SHOW_LOGIN:
            return {...state, show_modal: 'login'};
        case SHOW_SIGNUP:
            return {...state, show_modal: 'sign_up'};
        case CLOSE_LOGIN_MODAL:
            return {...state, show_modal: undefined};
        default:
            return state;
    }
}

export default userReducer;
