import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';

import App from './app';
import * as models from './models';
import Axios from './axios-client';

let Store = init({
    models
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

ReactDOM.render(<Node />, document.getElementById('root'));

if (module.hot) {
    module.hot.accept();
}
