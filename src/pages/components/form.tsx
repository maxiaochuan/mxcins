import * as React from 'react';
import { Button, Form, FormText, FormPassword } from '@mxcins/components';
import { Record } from '../../components';

const LayoutView = () => {
  return (
    <>
      <Record title="space">
        <Form initialValues={{ username: '123', password: '' }} onFinish={v => console.log('v', v)}>
          <FormText name="username" label="asdf" />
          <FormPassword name="password" />
          <input type="password" autoComplete="current-password" />
          <Button htmlType="submit">submit</Button>
          <Button htmlType="reset">reset</Button>
        </Form>
      </Record>
    </>
  );
};

export default LayoutView;
