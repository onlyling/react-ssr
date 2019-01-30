import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';

const { Sider, Content } = Layout;

@connect(
    ({ User }) => ({
        UserInfo: User.UserInfo
    }),
    () => ({})
)
class Node extends React.Component {
    render() {
        let { UserInfo } = this.props;

        if (UserInfo['user_name']) {
            return (
                <Layout>
                    <Sider>Sider</Sider>
                    <Layout style={{ marginLeft: 200, marginTop: 50 }}>
                        <Content>{this.props.children}</Content>
                    </Layout>
                </Layout>
            );
        } else {
            return <Redirect to="/login" />;
        }
    }
}

export default Node;
