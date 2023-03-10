import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { loginService} from '../../service/login/login.js';

const LoginForm: React.FC = props => {

  const [user] = useState({
    userId: 'admin',
    password: 'admin',
  });

  const onFinish = async (values: any) => {
    const data = await loginService(values)
    localStorage.setItem('token', data);
  }
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div id='loginForm'>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={ user }
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="账号"
          name="userId"
          rules={[{ required: true, message: '请输入账号！' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入密码！' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
