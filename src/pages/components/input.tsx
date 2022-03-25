import * as React from 'react';
import { Input } from '@mxcins/components';
import { Record } from '../../components';

function onSearch(value: string, _: React.SyntheticEvent) {
  console.log('args', value, typeof value, value === '');
}

const LayoutView = () => {
  return (
    <>
      <Record title="space">
        <Input prefix="asdf" />
        <Input suffix="asdf" />
        <button onClick={e => console.log(e)}></button>
        <input style={{ border: '1px solid black' }} />
        <Input placeholder="Basic usage" />
        <Input addonBefore="http://" addonAfter=".com" />
        <Input addonBefore="http://" />
        <Input addonAfter=".com" />
        <Input.Search onSearch={onSearch} />
        <Input.Search addonBefore="someone" />
      </Record>
    </>
  );
};

export default LayoutView;
