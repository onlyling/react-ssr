import React from 'react';
//使用静态 static router
import { StaticRouter } from 'react-router-dom';
import ReactDOMServer from 'react-dom/server';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';

import App from './app';

// import stats from '../ssr/react-loadable.json';

class SSR {
    render(url, stats) {
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
        let bundles = getBundles(stats, modules);

        return {
            html,
            scripts: this.generateBundleScripts(bundles),
            getBundles,
            modules
        };
    }

    //把SSR过的组件都转成script标签扔到html里
    generateBundleScripts(bundles) {
        return bundles
            .filter((bundle) => {
                return (bundle || {}).file.endsWith('.js');
            })
            .map((bundle) => {
                return `<script type="text/javascript" src="${
                    bundle.publicPath
                }"></script>\n`;
            });
    }

    static preloadAll() {
        return Loadable.preloadAll();
    }
}

export default SSR;
