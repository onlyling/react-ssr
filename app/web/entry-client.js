import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Loadable from 'react-loadable';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';

import App from './app';
import * as models from './models';
import Axios from './axios-client';

const preloadedState = window.__PRELOADED_STATE__;

let Store = init({
    models,
    redux: preloadedState
        ? {
              initialState: preloadedState
          }
        : {}
});

// 添加 Axios 到 redux
Store.model({ name: 'Axios', state: Axios });

class Node extends React.Component {
    render() {
        return (
            <Router>
                <LocaleProvider locale={zh_CN}>
                    <Provider store={Store}>
                        <App />
                    </Provider>
                </LocaleProvider>
            </Router>
        );
    }
}

const RootELe = document.getElementById('root');

if (RootELe.innerHTML) {
    Loadable.preloadReady().then(() => {
        ReactDOM.hydrate(<Node />, RootELe);
    });
} else {
    ReactDOM.render(<Node />, RootELe);
}
