# React SSR

> React 服务器端渲染

## 一些笔记

webpack 中 output 的 publicPath 需与 webpack-dev-server 的 publicPath 一致，不若，引入拆分的资源会因为路径问题报错。例如 `/aa/list` 可能会是引用 `/aa/static/aa.xx.js`，其实应该是 `/static` 路径才对。

[Class-的静态属性和实例属性](http://es6.ruanyifeng.com/#docs/class#Class-%E7%9A%84%E9%9D%99%E6%80%81%E5%B1%9E%E6%80%A7%E5%92%8C%E5%AE%9E%E4%BE%8B%E5%B1%9E%E6%80%A7) 如果要用这个，Babel 里需要使用一个 `babel-preset-stage-2` 这样试验性的解析器。

antd 与 css-module 冲突了，写了两个解析规则，互相屏蔽才搞定，试图寻找更优雅的方式。