/**
 * Created by congnt on 6/16/18.
 */


"use strict";
import {HttpClient} from "../../../../utils/HttpClient";
import {select, call, put, takeEvery, takeLatest} from 'redux-saga/effects'
import {
    FETCH_BANNER,
    FETCH_BANNER_ERROR,
    FETCH_BANNER_SUCCESS,
    FETCH_LIST_ITEM,
    FETCH_LIST_ITEM_SUCCESS
} from "./types";
import 'isomorphic-fetch';

function fetchBannerData() {
    return HttpClient.get('https://api.tiki.vn/personalization/v2/personalized_categories');
}

function* fetchBanner(action) {
    try {
        const banners = yield call(fetchBannerData);
        yield put({type: FETCH_BANNER_SUCCESS, data: banners})
    } catch (err) {
        yield put({type: FETCH_BANNER_ERROR, data: err.stack})
    }
}

//List item
function fetchListItemData() {
    return HttpClient.get('tour-service/items');
}

function* fetchListItem(action) {
    try {
        const state = yield select();
        console.log(state, 'state');

        const items = yield call(fetchListItemData);
        yield put({type: FETCH_LIST_ITEM_SUCCESS, data: items})
    } catch (err) {
        console.error(err.stack);
        yield put({type: FETCH_BANNER_ERROR, data: err.stack})
    }
}

export default [takeEvery(FETCH_BANNER, fetchBanner), takeEvery(FETCH_LIST_ITEM, fetchListItem)];