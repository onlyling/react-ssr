import React, { Fragment } from 'react';
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
            <Fragment>
                <CnodeTopHeader navs={HeaderNavs} />
                {this.props.children}
            </Fragment>
        );
    }
}

export default Node;
