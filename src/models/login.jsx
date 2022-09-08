import { useCallback } from 'react';
import $http from 'api'

export default {
  namespace:'user',
  state:{
    userInfo:null
  },
  reducers:{

  },
  effects:{
    *login({ payload }, { put }) {
      const {data} = yield call($http.test)
    }
  },
}
