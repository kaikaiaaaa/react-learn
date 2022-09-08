import React, { useState } from 'react';
import './index.less';
import { Button, Checkbox, Form, Input } from 'antd';
import { loginRule } from 'utils/rules';
import { history } from 'umi';

const RegisterForm = (props) => {
  const [loading, setLoading] = useState(false);
  const onFinish = (values) => {
    setLoading(true);
    setLoading(false);
    if (values.password === '111111') {
      setLoading(false);
      history.push('/mobile/device/list');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const handleInputChange = () => {
    setLoading(false);
  };

  return (
    <div className='login-form'>
      <div>注册</div>
      <Form className='form' name='basic' initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
      >
        <Form.Item label='邮箱' name='mail' rules={loginRule.mail}>
          <Input onChange={handleInputChange} />
        </Form.Item>LoginForm

        <Form.Item label='密码' name='password' rules={loginRule.password}>
          <Input.Password onChange={handleInputChange} />
        </Form.Item>

        <Form.Item name='remember' valuePropName='checked' wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>记住密码</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit' loading={loading}>
            登录
          </Button>
        </Form.Item>
      </Form>

    </div>
  );
};

export default RegisterForm;
