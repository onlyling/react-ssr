const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const SSR = require('./app/ssr/ssr');
const stats = require('./app/public/static/react-loadable.json');

//preload all components on server side, 服务端没有动态加载各个组件，提前先加载好
SSR.preloadAll()
    .then(() => {})
    .catch((err) => {
        console.log(err);
    });

//实例化一个SSR对象
const s = new SSR();

app.use('/public', express.static(path.join(__dirname, 'app/public')));

app.get('*', (req, res) => {
    let HTML_INDEX = fs.readFileSync(path.join(__dirname, 'app/public/static/index.html')).toString();
    //根据路由，渲染不同的页面组件
    const rendered = s.render(req.originalUrl, stats);
    const extra = `<div id="root">${rendered.html}</div>${rendered.scripts.join()}`;
    const html = HTML_INDEX.replace('<div id=root></div>', extra);
    res.send(html);
});

app.listen(3000, () => {
    console.log('Running on http://localhost:3000/');
});
