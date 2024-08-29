import React from 'react';
import { Form, Input, Button, Checkbox, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { userService } from '@/services';
import Cookie from 'js-cookie';
import { history } from '@umijs/max';

const LoginPage = () => {


  const onFinish = (values) => {
    userService.login(values)
      .then((res) => {
        if (res.code === 200) {
          message.success('登录成功');
          Cookie.set('token', res.data.token);
          history.push('/');
        } else {
          message.error(res.message);
        }
      })
      .catch((err) => {
        message.error('登录失败');
      });
  };

  return (
    <div className="min-h-screen bg-cover flex flex-col items-center justify-center bg-no-repeat bg-center">
      <h1 className="text-4xl font-bold text-white mb-8">Sgin</h1>
      <Card className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">登录</h2>
        <Form
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input
              prefix={<UserOutlined className="text-gray-400" />}
              placeholder="用户名"
              className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input
              prefix={<LockOutlined className="text-gray-400" />}
              type="password"
              placeholder="密码"
              className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </Form.Item>
          <Form.Item>
            <div className="flex items-center justify-between mb-4">
              <Checkbox className="text-gray-600">记住我</Checkbox>
              <a className="text-sm text-blue-600 hover:text-blue-500" href="#">
                忘记密码?
              </a>
            </div>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
