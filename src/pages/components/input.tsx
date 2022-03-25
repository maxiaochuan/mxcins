import * as React from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { Input } from '@mxcins/components';
import { Record } from '../../components';

const { Search, TextArea } = Input;

const onSearch = (v: string) => console.log(v);

const LayoutView = () => {
  const [v, set] = React.useState('');
  return (
    <>
      <Record title="space">
        <Input placeholder="Basic usage" maxLength={10} />
        <Input placeholder="Basic usage" size="small" />
        <Input placeholder="Basic usage" size="large" />
        <br />
        <br />
        <br />
        <Input addonBefore="http://" addonAfter=".com" defaultValue="mysite" />
        <Input addonAfter={<SettingOutlined />} defaultValue="mysite" />
        <Input addonBefore="http://" suffix=".com" defaultValue="mysite" />
        <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
        <Search
          placeholder="input search text"
          value={v}
          onChange={e => set(e.target.value)}
          allowClear
          onSearch={onSearch}
          style={{ width: 200 }}
        />
        <Search
          addonBefore="https://"
          placeholder="input search text"
          allowClear
          onSearch={onSearch}
          style={{ width: 304 }}
        />
        <TextArea rows={4} />
        <br />
        <br />
        <TextArea rows={4} placeholder="maxLength is 6" maxLength={6} />
      </Record>
    </>
  );
};

export default LayoutView;
