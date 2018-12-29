import React from 'react';
import { connect } from 'react-redux';
import CnodeTopHeader from '@components/cnode-top-header/cnode-top-header';

// import { Layout, Menu, Icon } from 'antd';

const HeaderNavs = []

@connect(
    () => ({
    }),
    () => ({})
)
class Node extends React.Component {
    render() {
        return (
            <div>
                <CnodeTopHeader navs={HeaderNavs} />
                {this.props.children}
            </div>
        );
    }
}

export default Node;
