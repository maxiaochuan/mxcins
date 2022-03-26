import * as React from 'react';
import { SettingOutlined, ClockCircleOutlined, UserOutlined } from '@ant-design/icons';
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
        <TextArea rows={2} />
        <TextArea rows={4} placeholder="maxLength is 6" maxLength={6} />
        <Input.Password placeholder="input password" />
        <Input.Password
          placeholder="input password"
          // iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />
        <Input status="error" placeholder="Error" allowClear />
        <Input status="warning" placeholder="Warning" />
        <Input status="error" prefix={<ClockCircleOutlined />} placeholder="Error with prefix" />
        <Input
          status="warning"
          prefix={<ClockCircleOutlined />}
          placeholder="Warning with prefix"
        />
        <Input size="large" placeholder="large size" prefix={<UserOutlined />} />
        <Input placeholder="default size" prefix={<UserOutlined />} />
        <Input size="small" placeholder="small size" prefix={<UserOutlined />} />
            <Search placeholder="input search loading default" loading />
    {/* <Search placeholder="input search loading with enterButton" loading enterButton /> */}
    {/* <Search placeholder="input search text" enterButton="Search" size="large" loading /> */}
      </Record>
    </>
  );
};

export default LayoutView;
