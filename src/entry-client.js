import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { init } from '@rematch/core';
import { Provider, connect } from 'react-redux';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';

import ScrollToTop from './components/scroll-to-top/scroll-to-top';
import Routes from './routes';
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
                        <ScrollToTop>
                            <Link to="/home">home</Link>
                            &emsp;
                            <Link to="/list/index">list</Link>
                            &emsp;
                            <Link to="/error">404</Link>
                            &emsp;
                            <Link to="/admin/home">admin-home</Link>
                            <Routes />
                        </ScrollToTop>
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
