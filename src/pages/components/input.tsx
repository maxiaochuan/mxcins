import * as React from 'react';
import { Input } from '@mxcins/components';
import { Record } from '../../components';

const LayoutView = () => {
  return (
    <>
      <Record title="space">
        <button onClick={e => console.log(e)}></button>
        <input style={{ border: '1px solid black' }} />
        <Input placeholder="Basic usage" />
        <Input addonBefore="http://" addonAfter=".com" />
        <Input addonBefore="http://" />
        <Input addonAfter=".com" />
        <Input.Search onSearch={(...args) => console.log('args', args)} />
        <Input.Search addonBefore="someone" />
      </Record>
    </>
  );
};

export default LayoutView;
