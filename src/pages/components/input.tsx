import * as React from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { Input } from '@mxcins/components';
import { Record } from '../../components';

const { Search } = Input;

const onSearch = (v: string) => console.log(v);

const LayoutView = () => {
  const [v, set] = React.useState('');
  return (
    <>
      <Record title="space">
        <input type="text" onChange={e => console.log(e, e.target.value)} />
        <Input placeholder="Basic usage" />
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
    {/* <Search placeholder="input search text" onSearch={onSearch} enterButton />
    <Search
      placeholder="input search text"
      allowClear
      enterButton="Search"
      size="large"
      onSearch={onSearch}
    />
    <Search
      placeholder="input search text"
      enterButton="Search"
      size="large"
      suffix={suffix}
      onSearch={onSearch}
    /> */}
      </Record>
    </>
  );
};

export default LayoutView;
