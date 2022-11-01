import * as usersActions from '../actions/users';

export default function users(state = [], action) {
    switch (action.type) {
        case usersActions.addUser:
            return [...state, action.payload];
        case usersActions.deleteUser:
            return state.filter(user => user.id !== action.payload);
        case usersActions.updateUser:
            return state.map(user => {
                if (user.id === action.payload.id) {
                    return action.payload;
                }
                return user;
            })
        default:
            return state;
    }
}
