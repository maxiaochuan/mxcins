import * as React from 'react';
import { Space, Button } from '@mxcins/components';
import { Record } from '../../components';

const LayoutView = () => {
  return (
    <>
      <Record title="space">
        <Space>
          <Button>Header</Button>
          <Button>Content</Button>
          <Button>Footer</Button>
        </Space>
        <Space size="small">
          <Button>Header</Button>
          <Button>Content</Button>
          <Button>Footer</Button>
        </Space>
      </Record>
    </>
  );
};

export default LayoutView;
