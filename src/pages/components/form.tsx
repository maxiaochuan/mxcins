import * as React from 'react';
import { tw } from 'twind';
import { PhoneOutlined, LockOutlined } from '@ant-design/icons';
import { Button, Form, FormText, FormPassword, Twind } from '@mxcins/components';
import { Record } from '../../components';

const LayoutView = () => {
  return (
    <>
      <Record title="space">
        <Form initialValues={{ username: '123', password: '' }} onFinish={v => console.log('v', v)}>
          <FormText
            name="mobile"
            placeholder="清输入手机号"
            // label="手机号"
            // hideLabel
            register={{
              require: '请输入手机号',
            }}
            fieldProps={{
              className: tw`border-0 border-b-1 rounded-none shadow-none`,
              prefix: <PhoneOutlined />,
            }}
          />
          <FormText.Password
            name="password"
            placeholder="请输入密码"
            fieldProps={{
              className: tw`border-0 border-b-1 rounded-none shadow-none`,
              prefix: <LockOutlined />,
            }}
          />
          <Button type="primary" htmlType="submit" block loading={false}>
            登录
          </Button>
          <FormText name="username" label="asdf" />
          <FormText name="u2" label="asdf" required />
          <FormText
            name="u3"
            label="asdf"
            required
            placeholder="asdf"
            fieldProps={{ className: Twind.tw`border-danger` }}
          />
          <Button htmlType="submit">submit</Button>
          <Button htmlType="reset">reset</Button>
        </Form>
      </Record>
    </>
  );
};

export default LayoutView;
