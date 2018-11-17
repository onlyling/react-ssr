import React from 'react';
//使用静态 static router
import { StaticRouter } from 'react-router-dom';
import ReactDOMServer from 'react-dom/server';
import Loadable from 'react-loadable';
//下面这个是需要让react-loadable在服务端可运行需要的，下面会讲到
import { getBundles } from 'react-loadable/webpack';
// import stats from '../build/react-loadable.json';

import { Provider } from 'react-redux';
import { init } from '@rematch/core';
import AppRoutes from './app';
import * as models from './models';
import resetAxios from './axios-server';

let Store = init({
    models
});

class SSR {
    render(url, stats) {
        let modules = [];
        const context = {};
        // 重置 axios 以替换当前用户
        Store.model({ name: 'Axios', state: resetAxios({}) });

        const html = ReactDOMServer.renderToString(
            <Loadable.Capture report={(moduleName) => modules.push(moduleName)}>
                <Provider store={Store}>
                    <StaticRouter location={url} context={context}>
                        <AppRoutes />
                    </StaticRouter>
                </Provider>
            </Loadable.Capture>
        );
        //获取服务端已经渲染好的组件数组
        let bundles = getBundles(stats, modules);
        return {
            html,
            scripts: this.generateBundleScripts(bundles)
        };
    }
    //把SSR过的组件都转成script标签扔到html里
    generateBundleScripts(bundles) {
        return bundles
            .filter((bundle) => bundle.file.endsWith('.js'))
            .map((bundle) => {
                return `<script type="text/javascript" src="${bundle.publicPath}"></script>\n`;
            });
    }

    static preloadAll() {
        return Loadable.preloadAll();
    }
}

export default SSR;
