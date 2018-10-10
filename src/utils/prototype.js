/**
 * Created by congnt on 7/15/18.
 */
"use strict";
import {STORAGE_KEY} from "../consts/Storage";

let moment = require('moment');

global['parseResponse'] = function (data) {
    if (data.status === 'success') {
        return data
    }
    throw new Error(data.message);
};

global['isServer'] = !(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement);
global['isAuth'] = function () {
    try {
        if (isServer) {
            return false;
        }
        let data = JSON.parse(localStorage.getItem(STORAGE_KEY.USER));
        if (data) {
            let {access_token, expires} = data;
            let duration = moment(expires).toDate().getTime() - moment().add(1, 'hour').toDate().getTime();
            if (duration > 0) {
                return access_token
            }
        }
        return false;
    } catch (err) {
        console.error(err.stack);
        return false;
    }
};
global['getUserData'] = function () {
    try {
        if (isServer) {
            return undefined;
        }
        return JSON.parse(localStorage.getItem(STORAGE_KEY.USER));
    } catch (err) {
        console.error(err.stack);
        return undefined;
    }
};

Promise.prototype.executeHttp = function () {
    return this.then(result => {
        return new Promise((resolve, reject) => {
            if (result.status === 'success') {
                resolve(result);
            } else {
                reject(result);
            }
        });
    })
};