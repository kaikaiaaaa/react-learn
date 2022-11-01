import {createStore, bindActionCreators} from 'redux';
import * as numberActions from './action/numberAction.js';
import reducer from './reducer/index.js';

/**
 * 创建仓库
 * @param reducer
 * @param preloadedState 数据默认值
 */
const store = createStore(reducer, 0);
//将dispatch和action绑定
const boundActions =  bindActionCreators(numberActions, store.dispatch)
//得到一个increaseActions并自动分发
boundActions.getIncreaseAction()

/**
 * 订阅仓库的变化,将action分发到store中
 */

console.log(store.getState());

// store.dispatch(numberActions.getIncreaseAction()); //向仓库分发action
// store.dispatch(numberActions.getSetAction(100)); //向仓库分发action
console.log(store.getState());
