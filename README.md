# 创建脚手架

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
const a = 123, b = 1211;
const obj = {
  a: 1
}
const obj = <span>元素对象</span>;
const arr = [1, 2, 3];
number.fill(0)
var list = number.map((item, i) => (<li key={i}>{i}</li>))
const url = '', cls = 'a'
const div = (
  <div>
    {/*这里是注释*/}
    {a} * {b} = {a * b}
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
        width: '200px'
      }}></img>
    </div>
  </div>
)
ReactDOM.render(div, document.getElementById('root'))
```

# 2.组件及组件属性

组件名称首字母必须大写

## 使用函数作为组件

```js
import React from 'react';
import ReactDOM from 'react-dom';

//声明一个组件
function MyFuncComp() {
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

export default function MyFuncComp() {
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
import { Component } from "react";
import React from "react";

export default class MyClassComp extends Component {
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

function handleClick() {
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
componentDidUpdate(prevProps, prevState)
{
  if (prevProps.title !== this.props.title) {
    console.log('props中的title数据改变了');
  }
  if (prevState.info !== this.state.info) {
    console.log('state中的info数据改变了');
  }
}
```

函数组件很复杂 可以useEffect这个React Hook监听数据的变化，但是无法像Vue的watch能够获取改变前的旧数据。 所以要自定义一个Hook来实现类似Vue的watch的功能。

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

  const unwatch = () => {
    isWatch.current = false;
  };
  return unwatch;
}


```

使用

```js
export { useState } from 'react';
export { useWatch } from './hook.js';
export default function HelloWorld() {
  const [title, setTitle] = useState('hello world')
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

# 函数组件中hook的使用

## 1. useState 函数组件中使用状态

```js
import React, { useState } from 'react';

export default function HelloWorld() {
  // useState 接收一个初始值，返回一个数组，第一个元素是状态值，第二个元素是改变状态值的函数
  // 以下解构的语法 相当于 const title = state[0] const setTitle = state[1]
  const [title, setTitle] = useState('hello world')
  const handleChangeTitle = () => {
    setTitle('hello React')
  }
  return (
    <div onClick={handleChangeTitle}>{title}</div>
  );
}
```

***注意细节***

1. useState 写在函数的初始位置
2. 禁止写在循环中，条件判断中
3. useState 返回的函数（数组的第二项），引用不变
4. 如果使用函数改变数据，若数据和之前的数据完全相等，就不会导致重新渲染
5. 使用函数改变数据时，传入的新数据不会和原来的数据进行合并而是直接替换，所以数据要保持独立

## 2. useEffect 函数组件中使用状态

useEffect 该函数接受一个函数作为参考，接收的函数就是需要进行副作用操作的函数

副作用：

1. ajax请求
2. 计时器
3. 其他异步操作
4. 更改真实dom对象
5. 本地存储
6. 其他会对外部产生影响的操作

```js
import React, { useState, useEffect } from 'react';

export default function HelloWorld() {
  const [title, setTitle] = useState('hello world')
  const handleChangeTitle = () => {
    setTitle('hello React')
  }
  useEffect(() => {
    document.title = `改变了title： ${title}`
  })

  useEffect(() => {
    //  dosth 空数组的作用是仅在首次挂载时进行
    // 立即执行函数
    (async function() {
      const res = await getXXX(page, 10)
      console.log('res...');
    })()
  }, [])

  useEffect(() => {
    //  dosth page,limit变化时执行
    // 立即执行函数
    (async function() {
      const res = await getXXX(page, limit)
      console.log('res...');
    })()
  }, [page, limit])

  return (
    <div onClick={handleChangeTitle}>{title}</div>
  );
}
```

***细节***

1. 副作用函数的运行时间点，是在页面完成真实的UI渲染后。因此他的执行是异步的，不会阻塞页面的渲染。
2. 不要放入判断循环语句中

## 3.自定义hook

将一些公共的逻辑抽离出来，封装成一个函数，然后在需要的地方调用

1. 自定义hook的函数名必须以use开头
2. 自定义hook中可以使用其他的hook
3. 自定义hook中可以使用useState，useEffect等内置的hook

```js
// 例 很多组件在渲染完成后都需要调取一个共同的数据
/**
 * 自定义hook
 * 当组件加载完成后 获取此接口
 */
import { useEffect, useState } from 'react';

export function useAll() {
  const [allData, setAllData] = useState([]);
  useEffect(() => {
    (async () => {
      //获取接口
      const res = await getXXX();
      setAllData(res);
    })();
  }, []);
  return allData;
}



```

## 4.context-hook

context-hook 上下文hook

```js
import React, { useState, useEffect, useContext } from 'react';
import { createCtx } from 'react-context-hook';

const ctx = React.createContext()

function Text() {
  const value = useContext(ctx);
  return (
    <h1>上下文的值：{value}</h1>
  )
}

export default function App() {
  return (
    <div>
      <ctx.Provider value="abc111">
        <Text/>
      </ctx.Provider>
    </div>
  )
}


```

## 5. callback-hook

该函数有两个参数：只能固定函数

1. 函数：useCallback会固定该函数的引用，只要依赖项没有发生变化,则始终返回之前的函数地址
2. 数组，记录依赖项 该函数返回：引用相对固定的函数地址

```js

const handleClick = useCallBack(() => {
  setTxt('123')
}, [])
```

## 6. memo-hook

```js
//高开销计算时返回结果不需要重新渲染/计算
const expensive = useMemo(() => {
  let sum = 0;
  for (let i = 0; i < 1000000000; i++) {
    sum += i;
  }
  return sum;
}, []);
const handleClick = () => {
  setXXX('234')
}
return (
  <div>
    <h1>expensive:{expensive}</h1>
    <h2 onclick=handleClick></h2>
  </div>
)

```

## 7. ref-hook

useRef函数

1. 一个参数：默认值
2. 返回值：一个对象，对象的current属性就是传入的参数值

```js
import React, { useRef } from 'react';

export default function() {
  const inputRef = useRef();
  const handleClick = () => {
    inputRef.current.focus();
  }
  return (
    <div>
      <input ref={inputRef}/>
      <button onClick={handleClick}>聚焦</button>
    </div>
  )
}
```
