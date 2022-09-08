import { defineConfig } from 'umi';
//别名映射
const { resolve } = require('path');
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  dva: { immer: true },
  alias: {
    //将文件夹进行映射
    utils: resolve(__dirname, './src/utils'),
    components: resolve(__dirname, './src/components'),
    common: resolve(__dirname, './src/common'),
    api: resolve(__dirname, './src/service'),
  },
  proxy: {
    '/apis': {
      'target': 'http://192.168.199.74:8080/',
    },
  },
  //国际化配置
  locale: {
    default: 'zh-CN',
    antd: true,
    title: false,
    baseNavigator: true,
    baseSeparator: '-',
  },
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  // ],
  antd: {
    mobile: false, //引入antdesign-mobile样式报错，这里要设置false
  },
  fastRefresh: {},
});
