# React SSR

> React 服务器端渲染

## 一些笔记

webpack 中 output 的 publicPath 需与 webpack-dev-server 的 publicPath 一致，不若，引入拆分的资源会因为路径问题报错。例如 `/aa/list` 可能会是引用 `/aa/static/aa.xx.js`，其实应该是 `/static` 路径才对。

[Class-的静态属性和实例属性](http://es6.ruanyifeng.com/#docs/class#Class-%E7%9A%84%E9%9D%99%E6%80%81%E5%B1%9E%E6%80%A7%E5%92%8C%E5%AE%9E%E4%BE%8B%E5%B1%9E%E6%80%A7) 如果要用这个，Babel 里需要使用一个 `babel-preset-stage-2` 这样试验性的解析器。

antd 与 css-module 冲突了，写了两个解析规则，互相屏蔽才搞定，试图寻找更优雅的方式。

`css module` 在 SSR 的时候会引起 `window is not defined` 的问题，暂时发现[Server Side Rendering with CSS Modules](https://medium.com/@mattvagni/server-side-rendering-with-css-modules-6b02f1238eb1)有解决的方案。
> `window is not defined` 并不是 `css module` 的错，而是样式在打包的是没有提取出来，在代码中动态插入，导致报错。通过 `isomorphic-style-loader` 插件已经可以规避样式的问题了。

## 参考资料

* [React Server Side Rendering with Koa(CN)](https://blog.lovemily.me/posts-zh_cn/react-server-side-rendering-with-koa-zh_cn/)