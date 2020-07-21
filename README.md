# CSR 项目

搭建一个 react spa 客户端渲染项目，通过不同分支区分项目技术方案的演进

分支

- `master` 原始模板
- `rematch` 使用 rematch 代替 redux，并重新组织目录结构
- `useContext` 使用 hook context 代替 redux
- `node` 引入 node 代理层
- `graphql` 引入 graphql 代替 restful 接口，包含客户端和服务端的配置
- `node-awilix` 使用 awilix ioc 框架
- `node-inversify` 使用 inversify 框架

## 业务功能

- i18n 国际化

## 安装&运行

1. 将 npm 的源设置成淘宝镜像，使用 npm 安装项目固定版本的依赖（因为有 package-lock.json ）
2. 执行 `npm run dll` 生成 dll 缓存文件
3. 执行 `npm run dev` 启动项目
4. 执行 `npm run type-check` 开启 TS 类型检测

## 技术栈

React Hook 函数式编程 + React Lazy 懒加载

## CSS

- 项目中引入了 `Normalize.css`
- 项目默认支持 CSS 模块化

方案 1：（xxx.module.css/xxx.module.less/.xxx.module.scss 这些文件会默认 CSS 模块化 处理）

方案 2：简化 CSS 模块化配置

```js
import 'swiper/dist/css/swiper.css';
import style from './index.less?css-modules';
```

- 构建项目时会自动兼容 CSS3 样式，所以不需要自己去写浏览器兼容样式,引入 postcss

## 路由

- react-router 项目支持配置式路由
- connected-react-router 使用 redux 管理路由
- React Lazy 懒加载

## 数据状态管理

项目使用按照路由模块划分组织 reducer，公共部分使用

- 项目中针对 `axios` 做了二次封装

接口请求、跨域问题的处理

开发：webpack-dev-server 使用 proxy 代理
生产：node 做 API 网关：你可以使用中间件代理请求或者在 node 层使用发起新的请求

- `rematch`分支集成了 `rematch` ，简化 `redux` 的使用，并且使用 react-redux 的 hook 版本 useDispacth 和 useSelector
- `useContext`分支使用 context+useContext+useReducer 代替 redux
- `graphql`利用 GraphQL 代替 Restful 风格的 API 查询：不同端、准确返回、一次请求

react hook 代替 redux 的示例

```js
import React, { createContext, useContext, useReducer } from 'react';
import ReactDOM from 'react-dom';

// 这里我都写在一个文件里面了，实际项目中，Context肯定单独抽象出来
// 所有用到的地方再import进来
const Context = createContext();

const A = () => {
  const { dispatch, state } = useContext(Context);
  return (
    <>
      <button
        disabled={state.loading}
        onClick={() => {
          dispatch({
            type: 'click_async',
            //触发异步action，注意payload里面是一个异步获取方法
            payload: asyncFetch(new Date().getTime()),
          });
        }}
      >
        click async
      </button>
      <button
        disabled={state.loading}
        onClick={() => {
          dispatch({
            type: 'click_sync',
            payload: new Date().getTime(),
          });
        }}
      >
        click sync
      </button>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </>
  );
};

function reducer(state, action) {
  switch (action.type) {
    case 'click_async':
    case 'click_sync':
      return { ...state, value: action.payload };
    case 'loading_start':
      return { ...state, loading: true };
    case 'loading_end':
      return { ...state, loading: false };
    default:
      throw new Error();
  }
}

function isPromise(obj) {
  return (
    !!obj &&
    (typeof obj === 'object' || typeof obj === 'function') &&
    typeof obj.then === 'function'
  );
}

// 这里是mock了一个异步方法，1秒后才会返回结果，模拟请求数据
async function asyncFetch(p) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(p);
    }, 1000);
  });
}

/*这里对dispatch函数进行一个封装，使其支持处理异步action
简而言之就是判断传进来的action是不是Promise对象，如果是的话
先执行loading_start，将loading置为true
然后执行完成Promise后，将获得的结果执行一次action
再执行loading_end（实际项目中请求失败也应该执行loading_end，因项目而异，不展开了）
注意：这个loading是我项目中喜欢用的一个标志位，用来记录当前是不是处于请求中
因为经常需要有如果在请求中，按钮需要禁用，防止用户再点击这种需求
另外实际项目中,loading可以扩展成对象，记录各种异步请求的状态
这个灵感来源于dva-loading，感谢*/
function wrapperDispatch(dispatch) {
  return function(action) {
    if (isPromise(action.payload)) {
      dispatch({ type: 'loading_start' });
      action.payload.then(v => {
        dispatch({ type: action.type, payload: v });
        dispatch({ type: 'loading_end' });
      });
    } else {
      dispatch(action);
    }
  };
}

function App() {
  const [state, dispatch] = useReducer(reducer, { value: 0, loading: false });
  return (
    <>
      {/* 这里把state和包装过的dispatch绑定到Context上去，便于全局获取使用 */}
      <Context.Provider value={{ state, dispatch: wrapperDispatch(dispatch) }}>
        <A />
      </Context.Provider>
    </>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
```

## 规范

- 项目使用 `Eslint + Prettier` 统一代码风格
- 项目使用 `husky` 在 `git commit` 提交代码前，进行代码风格校验并修复

## 工具

- 项目中默认配置了一些常用工具函数

## 构建部署

- webpack 优化
- docker 容器一键部署
- 公司框架平台

## 注意

- webpack.dll.config.js

只用在开发环境，缓存模块提高打包速度，只存放一些不会经常变动的第三方库，每次引入新的第三方库，都要先运行 `npm run dll` 脚本构建缓存包。对于新版本的 Webpack 来说，dll 缓存依赖提升的速度不大明显。

- 什么时候需要代码分割

  - 单页面的话：如果不做异步加载，那么是没有必要拆分 chunk 的
  - 多页面或者要做异步加载时，那就需要拆分 chunk

## rematch 的原理

封装了两个插件：

dispach 和 effects 两个插件

核心代码：

```js
dispach插件
1、遍历model的reducers将model的name和reducername组合成action的type，返回dispatch的调用
2、同时将reducer函数的处理挂载在dispatch对象上，可以通过dispach.modelName.reducerName在ui组件上调用
for (const reducerName of Object.keys(model.reducers)) {
    this.validate([
      [
        !!reducerName.match(/\/.+\//),
        `Invalid reducer name (${model.name}/${reducerName})`,
      ],
      [
        typeof model.reducers[reducerName] !== 'function',
        `Invalid reducer (${model.name}/${reducerName}). Must be a function`,
      ],
    ])
    this.dispatch[model.name][reducerName] = this.createDispatcher.apply(
      this,
      [model.name, reducerName]
    )
  }
createDispatcher(modelName: string, reducerName: string) {
    return async (payload?: any, meta?: any): Promise<any> => {
      const action: R.Action = { type: `${modelName}/${reducerName}` }
      if (typeof payload !== 'undefined') {
        action.payload = payload
      }
      if (typeof meta !== 'undefined') {
        action.meta = meta
      }
      return this.dispatch(action)
    }
},
```

effects 源码

```js
中间件的封装(store)=>next=>action=>async () {}
middleware(store) {
  return next => async (action: R.Action) => {
    // async/await acts as promise middleware
    if (action.type in this.effects) {
      await next(action)
      return this.effects[action.type](
        action.payload,
        store.getState(),
        action.meta
      )
    }
    return next(action)
  }
},
```

## 最佳实践 rematch + graphql

## 最佳实践 react hook
