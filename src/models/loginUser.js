import { history } from 'umi';
export default {
  namespace: 'login', //命名空间
  state: null, //没有任何用户登录
  reducers: {
    setLoginUser(state, action) {
      return action.payload; //通过payload传递登录成功的账号
    },
  },
  effects: {
    //登录
    * login({ payload }, { put }) {
      const { loginMail, loginPassword } = payload;
      //todo ajax请求接口判断当前用户是否登录成功
      if (loginPassword === '111111') {
        //登录成功
        yield put({ type: 'setLoginUser', payload: loginMail });
        localStorage.setItem('login', loginMail);
        //  登录成功跳转到首页
        put(history.push('/mobile/device/list'))
      }else {
        console.log('登录失败处理');
      }
    },
    // 注销
    * loginOut(action, { put }) {
      localStorage.removeItem('login');
      yield put({ type: 'setLoginUser', payload: null });
    },
  },
};
