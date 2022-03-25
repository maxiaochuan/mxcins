import * as React from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { Input } from '@mxcins/components';
import { Record } from '../../components';

const LayoutView = () => {
  const [v, set] = React.useState('');
  return (
    <>
      <Record title="space">
        {/* <Input placeholder="Basic usage" /> */}
        <Input addonBefore="http://" addonAfter=".com" defaultValue="site" value={v} />
    {/* <Input addonAfter={<SettingOutlined />} />
    <Input addonBefore="http://" suffix=".com" /> */}
      </Record>
    </>
  );
};

export default LayoutView;
