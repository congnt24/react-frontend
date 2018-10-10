/**
 * Created by congnt on 6/16/18.
 */


"use strict";
import {FETCH_BANNER, FETCH_BANNER_SUCCESS, FETCH_LIST_ITEM_SUCCESS} from "./types";

export default (state = {action: ''}, action) => {
    switch (action.type) {
        case FETCH_BANNER_SUCCESS :
            return {...state, banners: action.data.data};
        case FETCH_LIST_ITEM_SUCCESS :
            return {...state, items: action.data.data};
        default :
            return state
    }
}
