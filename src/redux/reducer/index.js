/**
 * reducer必须是个纯函数
 */

import * as actionTypes from '../action/type.js';

export default function reducer(state = 0, action) {
    switch (action.type) {
        case actionTypes.INCREASE:
            return state + 1;
        case actionTypes.DECREASE:
            return state - 1;
        case actionTypes.SET:
            return action.payload;
        default:
            return state;
    }
}
