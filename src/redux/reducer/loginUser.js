import {setLoginUser} from '../action/loginUserAction';

export default function (state = null, action) {
    switch (action.type) {
        case setLoginUser:
            return action.payload;
        default:
            return state;
    }

}
