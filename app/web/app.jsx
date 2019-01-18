import React from 'react';
import { hot } from 'react-hot-loader/root';

import ScrollToTop from './components/scroll-to-top/scroll-to-top';
import CnodeLayout from './layouts/cnode-layout/cnode-layout';
import Routes, { routes } from './routes';
import './app.less';

export { routes };

class Node extends React.Component {
    render() {
        return (
            <ScrollToTop>
                <CnodeLayout>
                    <Routes />
                </CnodeLayout>
            </ScrollToTop>
        );
    }
}

if (process.env.NODE_ENV !== 'production') {
    Node = hot(Node);
}

export default Node;
