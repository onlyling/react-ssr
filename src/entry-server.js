import React from 'react';
//使用静态 static router
import { StaticRouter } from 'react-router-dom';
import ReactDOMServer from 'react-dom/server';
import Loadable from 'react-loadable';
//下面这个是需要让react-loadable在服务端可运行需要的，下面会讲到
import { getBundles } from 'react-loadable/webpack';

import App from './app';
import stats from '../ssr/react-loadable.json';

class SSR {
    render(url, data) {
        let modules = [];
        const context = {};
        const html = ReactDOMServer.renderToString(
            <Loadable.Capture report={(moduleName) => modules.push(moduleName)}>
                <StaticRouter location={url} context={context}>
                    <App />
                </StaticRouter>
            </Loadable.Capture>
        );

        //获取服务端已经渲染好的组件数组
        console.log(modules);
        let bundles = getBundles(stats, modules);

        return {
            html,
            scripts: this.generateBundleScripts(bundles)
        };
    }

    //把SSR过的组件都转成script标签扔到html里
    generateBundleScripts(bundles) {
        return bundles
            .filter((bundle) => {
                return (bundle || {}).file.endsWith('.js');
            })
            .map((bundle) => {
                return `<script type="text/javascript" src="/public${
                    bundle.publicPath
                }"></script>\n`;
            });
    }

    static preloadAll() {
        return Loadable.preloadAll();
    }
}

export default SSR;
