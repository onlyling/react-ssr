const express = require('express');
const proxy = require('http-proxy-middleware');
const path = require('path');
const fs = require('fs');
const app = express();

const SSR = require('./app/ssr/ssr');
const stats = require('./app/public/static/react-loadable.json');
const packageJson = require('./package.json');

//实例化一个SSR对象
const s = new SSR();

app.use('/public', express.static(path.join(__dirname, 'app/public')));

if (packageJson.proxy) {
    Object.keys(packageJson.proxy).forEach((key) => {
        app.use(key, proxy(packageJson.proxy[key]));
    });
}

app.get('*', async (req, res) => {
    let HTML_INDEX = fs.readFileSync(path.join(__dirname, 'app/public/static/index.html')).toString();
    //根据路由，渲染不同的页面组件
    const rendered = await s.render(req.originalUrl, stats);
    if (rendered.context.url) {
        return res.redirect(rendered.context.url);
    }

    const extra = [
        `<div id="root">${rendered.html}</div>`,
        `<script>window.__PRELOADED_STATE__ = ${JSON.stringify(rendered.initialState)}</script>`,
        rendered.scripts.join('')
    ].join('');
    const html = HTML_INDEX.replace('<div id=root></div>', extra);
    res.send(html);
});

//preload all components on server side, 服务端没有动态加载各个组件，提前先加载好
SSR.preloadAll()
    .then(() => {
        console.log('=== SSR.preloadAll ===');
        app.listen(3000, () => {
            console.log('Running on http://localhost:3000/');
        });
    })
    .catch((err) => {
        console.log(err);
    });
