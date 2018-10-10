/**
 * Created by congnt on 9/29/18.
 */


"use strict";
import {ERROR, INFO, NORMAL, SUCCESS, WARN} from "./types";

const initialState = {
    value: 0
};

function toastReducer(state = initialState, action) {
    let {type, message, ...props} = action;
    // props = {
    //     position: toast.POSITION.TOP_RIGHT,
    //     autoClose: 3000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: false,
    //     draggable: true,
    //     ...props
    // };
    switch (type) {
        case SUCCESS:
            return {...state, xxx: 11223};
        case WARN:
            return state;
        case ERROR:
            return {...state};
        case INFO:
            return state;
        case NORMAL:
            return state;
        default:
            return state;
    }
}

export default toastReducer;
