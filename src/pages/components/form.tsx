import * as React from 'react';
import { Form, FormText, FormPassword } from '@mxcins/components';
import { Record } from '../../components';

const LayoutView = () => {
  return (
    <>
      <Record title="space">
        <Form onFinish={v => console.log('v', v)}>
          <FormText name="username" label="asdf" />
          <FormPassword name="password" />
          <button type="submit">submit</button>
        </Form>
      </Record>
    </>
  );
};

export default LayoutView;
