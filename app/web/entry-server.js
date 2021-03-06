import React from 'react';
//使用静态 static router
import { StaticRouter } from 'react-router-dom';
import ReactDOMServer from 'react-dom/server';
import Loadable from 'react-loadable';
import reactTreeWalker from 'react-tree-walker';
//下面这个是需要让react-loadable在服务端可运行需要的，下面会讲到
import { getBundles } from 'react-loadable/webpack';

import { Provider } from 'react-redux';
import { init } from '@rematch/core';
import App, { routes } from './app';
import * as models from './models';
import resetAxios from './axios-server';

const asyncFetchData = async (App) => {
    let promises = [];

    const visitor = (element, instance) => {
        if (instance && typeof instance.fetchData === 'function') {
            promises.push(instance.fetchData());
        }
    };

    await reactTreeWalker(App, visitor);

    return Promise.all(promises);
};

class SSR {
    async render(url, stats) {
        let modules = [];
        const context = {};
        // 每次服务器端渲染，重新初始化一次
        let Store = init({
            models
        });
        // 重置 axios 以替换当前用户
        Store.model({ name: 'Axios', state: resetAxios({}) });

        const AppRoot = (
            <Loadable.Capture report={(moduleName) => modules.push(moduleName)}>
                <Provider store={Store}>
                    <StaticRouter location={url} context={context}>
                        <App />
                    </StaticRouter>
                </Provider>
            </Loadable.Capture>
        );

        if (context.url) {
            // 如果需要重定向
            return {
                context
            };
        }

        await asyncFetchData(AppRoot);

        const html = ReactDOMServer.renderToString(AppRoot);

        //获取服务端已经渲染好的组件数组
        let bundles = getBundles(stats, modules);

        return {
            context,
            html,
            scripts: this.generateBundleScripts(bundles),
            initialState: Store.getState()
        };
    }
    //把SSR过的组件都转成script标签扔到html里
    generateBundleScripts(bundles) {
        return bundles
            .filter((bundle) => bundle.file.endsWith('.js'))
            .map((bundle) => {
                return `<script type="text/javascript" src="${bundle.publicPath}"></script>`;
            });
    }

    static preloadAll() {
        return Loadable.preloadAll();
    }
}

export default SSR;
