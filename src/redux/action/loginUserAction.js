export const setLoginUser = Symbol("setLoginUser");

/**
 * 登录
 * @param user
 * @returns {{payload, type: symbol}}
 */
export function createSetLoginUserAction(user) {
    return {
        type: setLoginUser,
        payload: user
    }
}
