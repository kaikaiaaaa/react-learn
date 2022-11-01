import * as actionTypes from './type.js';

/**
 * 用于增加数字操作的action
 * @returns {{type: string}}
 */

export function getIncreaseAction() {
    return {
        type: actionTypes.INCREASE,
    };
}

export function getDecreaseAction() {
    return {
        type: actionTypes.DECREASE,
    };
}

export function getSetAction(payload) {
    return {
        type: actionTypes.SET,
        payload,
    };
}
