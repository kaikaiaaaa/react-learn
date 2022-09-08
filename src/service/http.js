import qs from 'qs';
import { message } from 'antd';
import { history } from 'umi'; //请求错误跳转用户登录界面

const fetch = require('dva').fetch;
console.log('fetch',fetch);
//创建响应式处理函数
const checkStatus = res => {
//  当请求！==200
  if (200 >= res.status < 300) {
    //  请求成功
    return res;
  }
  console.log('message', message);
  message.error(res.error);
  throw new Error(res.statusText);
};

//本次请求内容是否成功
const judeOkState = async res => {
  const cloneRes = await res.clone().json();
  if (cloneRes.code !== 0) {
    message.error(cloneRes.error);
    //跳转到登录页面
    history.replace('/users/login');
    //清除token
    sessionStorage.clear();
  }
  return res;
};
const handlerError = error => {
  console.log('error', error);
  return {
    code: -1,
    data: false,
  };
};

/**
 * options 传递的请求配置
 */
class http {
  static async staticFetch(url = '', options = {}) {
    let defaultOptions = {
      mode: 'cors', //支持跨域
      headers: {
        Authorization: sessionStorage.getItem('token') || null,
      },
    };
    if (options.method === 'POST' || options.method === 'PUT') {
      defaultOptions.headers['Content-type'] = 'application/json;charset=utf-8';
    }
    //  合并options
    console.log('defaultOptions', defaultOptions);
    const newOptions = { ...defaultOptions, ...options };
    return fetch(url, newOptions)
      .then(checkStatus) //拦截状态
      .then(judeOkState) //状态码是否成功
      .then(res => {
        //获取token
        const token = res.headers.get('Authorization');
        console.log('token', token);
        token && sessionStorage.setItem('token', token);
        console.log('res', res);
        return res.json();
      }).catch(handlerError);
  }

  // post请求处理
  post(url, params = {}, option = {}) {
    const options = Object.assign({ method: 'POST' }, option);
    options.body = JSON.stringify(params);
    return http.staticFetch(url, options);
  }

  //  put请求处理
  put(url, params = {}, option = {}) {
    const options = Object.assign({ method: 'PUT' }, option);
    options.body = JSON.stringify(params);
    return http.staticFetch(url, options);
  }

  //  get请求
  get(url, option = {}) {
    const options = Object.assign({ method: 'GET' }, option);
    console.log('qs', qs);
    Object.keys(option) && (url += '?' + qs.stringify(option));
    return http.staticFetch(url, options);
  }

  //  delete请求处理
  del(url, option = {}) {
    const options = Object.assign({ method: 'DELETE' }, option);
    Object.keys(option) && (url += '?' + qs.stringify(option));
    return http.staticFetch(url, options);
  }
}

const resFun = new http();
export default resFun;
