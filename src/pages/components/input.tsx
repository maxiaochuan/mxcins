import * as React from 'react';
import { Input } from '@mxcins/components';
import { Record } from '../../components';

const LayoutView = () => {
  return (
    <>
      <Record title="space">
        <div>
          <Input placeholder="Basic usage" />
          <Input placeholder="Blaceholder" size="small" />
          <Input placeholder="Blaceholder" size="large" />
        </div>
      </Record>
    </>
  );
};

export default LayoutView;
