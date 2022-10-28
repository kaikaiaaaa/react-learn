#创建脚手架
```
yarn create react-app react-learn
```
## 创建项目报错及解决方案

1. node版本不对
```
error pretty-format@27.1.0: The engine "node" is incompatible with this module. Expected version "^10.13.0 || ^12.13.0 || ^14.15.0 || >=15.0.0". Got "14.5.0"
error Found incompatible module.
```
解决方案：
```
 yarn config set ignore-engines true
```
2. 兼容问题
```
There might be a problem with the project dependency tree.
It is likely not a bug in Create React App, but something you need to fix locally.

The react-scripts package provided by Create React App requires a dependency:

  "webpack": "4.44.2"...

```
解决方案

根目录创建一个.env文件,把下面这行复制进去
```
SKIP_PREFLIGHT_CHECK=true
```
## 项目启动
```
 yarn start
```
# 1.JSX语法
ReactDOM库会把div对象转换成真是的dom结构
```js
import React from 'react';
import ReactDOM from 'react-dom';

//嵌入表达式
const a = 123,b=1211;
const obj = {
    a:1
}
const obj = <span>元素对象</span>;
const arr = [1,2,3];
number.fill(0)
var list = number.map((item,i) => (<li key={i}>{i}</li>))
const url = '',cls='a'
const div=(
<div>
    {/*这里是注释*/}
    {a} * {b} = {a*b}
    {/*不能写普通对象，报错*/}
    {/*元素对象可以*/}
    {obj}
    {/*数组，会遍历每一项然后放进来，当然数组中不能放普通对象*/}
    {arr}
    {/*元素对象数组*/}
    {list}
    {/*属性使用小驼峰明明法*/}
    <div>
        <img src={url} className={cls} style={{
            width:'200px'
        }}></img>
    </div>
</div>
)
ReactDOM.render(div,document.getElementById('root'))
```
# 2.组件及组件属性
组件名称首字母必须大写

## 使用函数作为组件
```js
import React from 'react';
import ReactDOM from 'react-dom';
//声明一个组件
function MyFuncComp(){
    return <h1>组件内容</h1>

}
//组件的使用
ReactDOM.render(<div>
    <MyFuncComp></MyFuncComp>
</div>, document.getElementById('root'))
```
把组件写在单独的js文件中，在页面引用

MyFuncComp.js
```js
import React from "react";

export default function MyFuncComp(){
    return <h1>组件内容：{props.number}</h1>
}
```
index.js
```js
import React from 'react';
import ReactDOM from 'react-dom';
import MyFuncComp from "./MyFuncComp";
ReactDOM.render(<div>
    <MyFuncComp number={2}></MyFuncComp>
</div>, document.getElementById('root'))
```

## 使用类作为组件[rcc]
必须继承react的Component，必须渲染render函数

MyClassComp.js
```js
import {Component} from "react";
import React from "react";

export default class MyClassComp extends Component{
    //该方法必须返回react元素
    render() {
        return <h1>类组件内容:{this.props.number}</h1>
    }
}
```
index.js
```js
import React from 'react';
import ReactDOM from 'react-dom';
import MyFuncComp from "./MyFuncComp";
import MyClassComp from "./MyClassComp";
ReactDOM.render(<div>
    <MyFuncComp></MyFuncComp>
    <MyClassComp number={1}></MyClassComp>
</div>, document.getElementById('root'))
```
# 3.组件状态
组件可以自行维护数据
## 类组件中如何使用
状态的初始化

状态的变化使用this.setState({})改变状态，react不能自己监控状态的变化.

```js
//倒计时demo
export default class MyClassComp extends Component {
    //也可以在这里初始化
    //state = {
    //             left: this.props.number
    //         };
    //会直接放在super后
    constructor(props) {
        super(props);
        //组件初始化状态
        this.state = {
            left: this.props.number
        };
        this.timer = setInterval(() => {
            //组件重新渲染
            this.setState({
                left: this.state.left - 1
            });
            if (this.state.left === 0) {
                //停止计时器
                clearInterval(this.timer)
            }
        }, 1000)
    }

    render() {
        return <h1>剩余时间:{this.state.left}</h1>
    }
}
```
view中使用
```js
import React from 'react';
import ReactDOM from 'react-dom';
import MyClassComp from "./MyClassComp";
ReactDOM.render(<div>
    <MyClassComp number={10}></MyClassComp>
</div>, document.getElementById('root'))
```
# 4.组件事件
事件本质上就是一个函数
```js
<button onClick={handleClick}>click</button>
function handleClick(){
    console.log('click');
}
```
# 5.组件的生命周期
React<16.0.0 旧版本生命周期

1.constructor：初始化阶段，初始化属性和状态。同一个组件对象，只会创建一次；不能在第一次挂载之前调用setState,构造函数中禁止使用setState

2.componentWillMount:组件即将被挂载。正常情况，只会被调用一次。可以使用setState但是不允许使用

3.render：渲染,返回的React元素会被挂载到虚拟Dom树中,最终渲染到页面的真实Dom中，render需要重新渲染就会重新运行,严禁使用setState，因为可能会导致无限渲染

4.componentDidMount:已经渲染挂载完成。可以使用setState,只会执行一次，通常会将ajax请求远程请求启动计时器等一开始需要的操作写在里面

5.组件进入活动状态

6.componentWillReceiveProps:即将接受收新的属性值,参数为新的属性对象,不推荐使用

7.shouldComponentUpdate:组件应该更新，指示React是否要重新渲染该组件，通过true/false指定，默认情况下会直接返回true

8.ComponentWillUpdate:组件即将被重新渲染

9.ComponentDidUpdate:在该函数中使用dom操作，改变元素

10.componentWillUnMount:组件被销毁。在该函数 销毁一些组件 比如计时器

# 6.如何监听父组件的变化

首次渲染不会执行，只有state或props改变时才会触发

类组件
```js
/**
 * prevProps 改变前的
 * prevState 改变后的
 */
componentDidUpdate(prevProps, prevState){
  if(prevProps.title !== this.props.title){
     console.log('props中的title数据改变了');
  }
  if(prevState.info !== this.state.info){
     console.log('state中的info数据改变了');
  }
}
```

函数组件很复杂
可以useEffect这个React Hook监听数据的变化，但是无法像Vue的watch能够获取改变前的旧数据。
所以要自定义一个Hook来实现类似Vue的watch的功能。
```js
//`current` 指向已挂载到 DOM 上的文本输入元素
import { useEffect, useRef } from 'react';
export function useWatch(value, callback, config = { immediate: false }) {
  const oldValue = useRef();
  const isInit = useRef(false);
  const isWatch = useRef(true);
  useEffect(() => {
    if (isWatch.current) {
      if (!isInit.current) {
        isInit.current = true;
        if (config.immediate) {
          callback(value, oldValue.current);
        }
      } else {
        callback(value, oldValue.current);
      }
      oldValue.current = value;
    }
  }, [value])

  const unwatch =  () => {
    isWatch.current = false;
  };
  return unwatch;
}


```

使用
```js
export {useState} from 'react';
export {useWatch} from './hook.js';
export default function HelloWorld() {
  const [title,setTitle] = useState('hello world')
  useWatch(title, (value, oldValue) => {
    console.log(value);
    console.log(oldValue)
  })
  const handleChangeTitle = () => {
    setTitle('hello React')
  }
  return (
    <div onClick={handleChangeTitle}>{title}</div>
  );
}

```

# useState useRef 区别

# React中父组件如何调用子组件的方法

