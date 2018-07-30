const express = require('express');
const path = require('path');
const app = express();

const SSR = require('./ssr/ssr');
//实例化一个SSR对象
const s = new SSR();

//preload all components on server side, 服务端没有动态加载各个组件，提前先加载好
SSR.preloadAll();

app.use('/public', express.static(path.join(__dirname, 'ssr')));

app.get('*', (req, res) => {
    //根据路由，渲染不同的页面组件
    const rendered = s.render(req.originalUrl);

    const html = `
    <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
      </head>
      <body>
        <div id="app">${rendered.html}</div>
        ${rendered.scripts.join()}
        <script type="text/javascript" src="/public/ssr.js"></script>
      </body>
    </html>
  `;

    res.send(html);
});

app.listen(3000, () => {
    console.log('Running on http://localhost:3000/');
});
