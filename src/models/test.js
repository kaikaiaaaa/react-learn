//dva使用 test
export default {
  namespace: 'test', //命名空间
  state: 0, //默认值
  //reducers处理状态变化
  reducers: {
    increase(state, action) {
      return state + 1;
    },
    add(state, { payload }) {
      //带有负载的情况
      return state + payload;
    },
  },
  //effects处理副作用（远程请求），不能改变状态
  effects: {
    * asyncIncrease(action, { call, put }) {
      yield call(delay, 2000);
      //异步+
      yield put({ type: 'increase' });
    },
  },
  //订阅者 ，每个模型开始时立即执行只执行一次
  subscriptions: {
    //订阅窗口尺寸变化(当窗口尺寸变化时，increase number)
    resizeIncrease({ dispatch }) {
      window.onresize = () => {
        dispatch({ type: 'increase' });
      };
    },
    historyIncrease({dispatch,history}){
      //监听路由变化(默认是hash路由)
      history.listen(() => {
        dispatch({ type: 'increase' })
      })

    },
  },
};

//测试异步
function delay(duration) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}
