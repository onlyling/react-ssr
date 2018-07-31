import React from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, message } from 'antd';

const FormItem = Form.Item;

@connect(
    () => ({}),
    ({ User }) => ({
        PostLogin: User.PostLogin
    })
)
@Form.create()
class Node extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();

        let { PostLogin, form } = this.props;

        form.validateFields(async (err, values) => {
            if (!err) {
                let data = await PostLogin(values);
                if (data.success) {
                    message.success('登录成功');
                } else {
                    message.error(data.msg);
                }
                console.log('Received values of form: ', values);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Form layout="inline" onSubmit={this.handleSubmit}>
                <FormItem>
                    {getFieldDecorator('user_name', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your username!'
                            }
                        ]
                    })(
                        <Input
                            prefix={<Icon type="user" />}
                            placeholder="Username"
                        />
                    )}
                </FormItem>

                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your Password!'
                            }
                        ]
                    })(
                        <Input
                            prefix={<Icon type="lock" />}
                            type="password"
                            placeholder="Password"
                        />
                    )}
                </FormItem>

                <FormItem>
                    <Button type="primary" htmlType="submit">
                        Log in
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

export default Node;
