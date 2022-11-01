export const addUser = Symbol("addUser");
export const deleteUser = Symbol("deleteUser");
export const updateUser = Symbol("updateUser");

/**
 * 添加用户
 * @param user
 * @returns {{payload, type: symbol}}
 */
export function createAddUserAction(user) {
    return {
        type: addUser,
        payload: user
    }
}

/**
 * 删除用户
 */
export function createDeleteUserAction(id) {
    return {
        type: deleteUser,
        payload: id
    }
}

/**
 * 更新用户
 */
export function createUpdateUserAction(id, user) {
    return {
        type: updateUser,
        payload: {...user, id}
    }
}
