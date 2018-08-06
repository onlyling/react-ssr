import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import { LocaleProvider } from 'antd';
import Loadable from 'react-loadable';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';

import App from './app';
import * as models from './models';

let store = init({
    models
});

class Node extends React.Component {
    render() {
        return (
            <Router>
                <LocaleProvider locale={zh_CN}>
                    <Provider store={store}>
                        <App />
                    </Provider>
                </LocaleProvider>
            </Router>
        );
    }
}

Loadable.preloadReady().then(() => {
    ReactDOM.hydrate(<Node />, document.getElementById('root'));
});

if (module.hot) {
    module.hot.accept();
}
