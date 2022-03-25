import * as React from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { Input } from '@mxcins/components';
import { Record } from '../../components';

function onSearch(value: string, _: React.SyntheticEvent) {
  console.log('args', value, typeof value, value === '');
}

const LayoutView = () => {
  return (
    <>
      <Record title="space">
        <Input placeholder="Basic usage" />
        <Input addonBefore="http://" addonAfter=".com" />
    <Input addonAfter={<SettingOutlined />} />
    <Input addonBefore="http://" suffix=".com" />
      </Record>
    </>
  );
};

export default LayoutView;
