# React SSR

> React 服务器端渲染

```bash
## 开发
npm run c-dev

## 打包
npm run build

## SSR
npm run build
npm run ssr
npm run http
```

## 一些笔记

### publicPath

webpack 中 output 的 publicPath 需与 webpack-dev-server 的 publicPath 一致，不若，引入拆分的资源会因为路径问题报错。例如 `/aa/list` 可能会是引用 `/aa/static/aa.xx.js`，其实应该是 `/static` 路径才对。

[Class-的静态属性和实例属性](http://es6.ruanyifeng.com/#docs/class#Class-%E7%9A%84%E9%9D%99%E6%80%81%E5%B1%9E%E6%80%A7%E5%92%8C%E5%AE%9E%E4%BE%8B%E5%B1%9E%E6%80%A7) 如果要用这个，Babel 里需要使用一个 `babel-preset-stage-2` 这样试验性的解析器。

> 升级到 Babel 7 后，改用 `@babel/plugin-proposal-class-properties` 解决，`@babel/preset-stage-2` 似乎和 `@babel/plugin-proposal-decorators` 有点冲突，所以没有再用这个，不过简单一点就是用 `@babel/preset-stage-2`，然后添加一个配置 decoratorsLegacy 应该就好了。

### css-module

antd 与 css-module 冲突了，写了两个解析规则，互相屏蔽才搞定，试图寻找更优雅的方式。

`css module` 在 SSR 的时候会引起 `window is not defined` 的问题，暂时发现[Server Side Rendering with CSS Modules](https://medium.com/@mattvagni/server-side-rendering-with-css-modules-6b02f1238eb1)有解决的方案。
> `window is not defined` 并不是 `css module` 的错，而是样式在打包的是没有提取出来，在代码中动态插入，导致报错。通过 `isomorphic-style-loader` 插件已经可以规避样式的问题了。

### axios

把 `axios` 放入 `redux` 中，可以在服务端注入 `cookie`。客户端的 `cookie` 直接从浏览器里获取，但是服务器端，需要从 http request 的 header 上获取，并且每次请求都要重新覆盖，所以有两个 `axios` 的入口。

浏览器端 `./app/web/axios-client.js` 里面，是直接把整个 `axios` 暴露出去，没问题，如果在服务器端，会出现下面那个第二次以后，请求变成多次。在 `./app/web/axios-server.js` 里面每次都是创建一个实例。

### 服务器端渲染

服务端需提前拉取数据，客户端则在 `componentDidMount` 调用平台上的差异，服务端渲染只会执行到 `compnentWillMount` 上，所以为了达到同构的目的，可以把拉取数据的逻辑写到 React Class 的静态方法上，一方面服务端上可以通过直接操作静态方法来提前拉取数据再根据数据生成 HTML，另一方面客户端可以在 `componentDidMount` 时去调用该静态方法拉取数据。

服务器端渲染的时候，怎么保证拿到数据后才渲染页面呢，如上文字说明，已经在每个组件中约定 `fetchData` 来当前组件需要的数据，只要在匹配路由的时候，等待每个组件获取完成数据后渲染就好了。现在组件被 `react-loadable` 包了一层，啷个玩呢。

看了 `react-loadable` 的源码，它只是做了等待的操作，当异步模块加载好后直接返回的是一个 React 组件。在 HTTP 应用启动前，已经预加载好所有异步模块了，通过日志也能看出来模块都加在好了。

```bash
--- routes ---
--- Topic ---
--- Topics ---
=== ??? ===
Running on http://localhost:3000/
```

```javascript
const promises = matchRoutes(routes, url).map(({ route, match }) => {
    if (match.isExact) {
        console.log('------');
        console.log(route.component);
        console.log('------');
    }
    if (match.isExact && route.component.fetchData) {
        return route.component.fetchData();
    }
    return Promise.resolve();
});
```
匹配出来的组件一点都不正常，哪儿出问题了呢。

```
{ [Function: n]
  preload: [Function],
  contextTypes: { loadable: { [Function: t] isRequired: [Circular] } } }
```

> 这个问题算是解决了，通过 `[react-tree-walker](https://github.com/ctrlplusb/react-tree-walker)` 遍历 React 的节点，等待请求结束后才渲染。同时，暴露了一个新的问题，第一次刷新能看到正确的状态，没刷新一次，服务器端就会多出现一次请求，很无解。剩下就是如何避免浏览器第一次打开页面不再发起异步请求。

### proxy

最开始是直接通过 axios 请求 cnode 的服务器，有一个与请求，然后才导向真实请求。

开发环境加入了 proxy，因为是 HTTPS 环境，所以需要加 `"secure": false`。

> 在服务器端添加代理的时候，由于关键字段值是 `/api/v1`,在获取它的值的时候，不能直接通过 `.` 的方式，需要用下标的方式。


## 参考资料

* [React Server Side Rendering with Koa(CN)](https://blog.lovemily.me/posts-zh_cn/react-server-side-rendering-with-koa-zh_cn/)