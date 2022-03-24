import * as React from 'react';
import { Input } from '@mxcins/components';
import { Record } from '../../components';

const LayoutView = () => {
  return (
    <>
      <Record title="space">
        <Input placeholder="Basic usage" />
        <Input addonBefore="http://" addonAfter=".com" />
        <Input addonBefore="http://" />
        <Input addonAfter=".com" />
        <Input.Search />
        <Input.Search addonBefore="someone" />
      </Record>
    </>
  );
};

export default LayoutView;
