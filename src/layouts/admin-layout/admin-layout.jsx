import React from 'react';
import { Layout, Menu, Icon } from 'antd';

const { Sider, Content } = Layout;

class Node extends React.Component {
    render() {
        return (
            <Layout>
                <Sider>323</Sider>
                <Layout style={{ marginLeft: 200, marginTop: 50 }}>
                    <Content>1213{this.props.children}</Content>
                </Layout>
            </Layout>
        );
    }
}

export default Node;
