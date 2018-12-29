import React from 'react';

import ScrollToTop from './components/scroll-to-top/scroll-to-top';
import CnodeLayout from './layouts/cnode-layout/cnode-layout';
import Routes from './routes';
import './app.less';

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

export default Node;
