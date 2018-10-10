/**
 * Created by congnt on 6/16/18.
 */


"use strict";
import {FETCH_BANNER, FETCH_LIST_ITEM} from "./types";
export const fetchBannerAction = (position) => {
    return {type: FETCH_BANNER, position}
};
export const fetchListItemAction = () => {
    return {type: FETCH_LIST_ITEM}
};
