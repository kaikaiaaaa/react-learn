import $http from 'api/index.js'
export default {
  namespace: 'common',
  state: {},
  subscriptions: {
    setUp({dispatch, history}) {
      console.log('dispatch', dispatch);
      //    初始化查询用户是否登陆，在app.start阶段
      dispatch({type: 'queryUserLogin', payload: {history}})

    },
  },
  effects: {
    * queryUserLogin({payload}, {put, call}) {
      console.log('payload', payload);
      const {history, history: {location: {pathname}}} = payload
      //    判定用户当前路径
      if (pathname !=='/login' && pathname !=='/login/forgetPassword'){
        if (!sessionStorage.getItem('userProfile' || !sessionStorage.getItem('token'))){
          console.log('强行登陆进行登录拦截');
          history.replace('/login')
        }else {
          const res = yield call($http.querUserLogin)
          if (res.code !== 0) return
        }
      }else {
        //    不要拦截
        sessionStorage.clear()
      }


    }
  },
}
