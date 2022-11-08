import { defineConfig } from 'umi';
import px2vw from 'postcss-px-to-viewport';
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
      target: 'http://192.168.199.74:8080/',
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
  // 配置额外的 postcss 插件(px 转 vw|vh)
  extraPostCSSPlugins: [
    px2vw({
      unitToConvert: 'px', // 要转化的单位
      viewportWidth: 1020, // 视窗的宽度，可根据自己的需求调整（这里是以PC端为例）
      viewportHeight: 1080, // 视窗的高度
      unitPrecision: 6, // 转换后的精度，即小数点位数
      propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
      viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
      fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
      selectorBlackList: ['un-px-transfer'], // 指定不转换为视窗单位的类名，
      minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
      mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
      replace: true, // 是否转换后直接更换属性值
      exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
      landscape: false, // 是否处理横屏情况
    }),
  ],
});
