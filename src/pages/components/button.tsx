import * as React from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import { Button } from '@mxcins/components';
import { Record } from '@/components';

const ButtonView = () => {
  const inputRef = React.useRef<HTMLElement>(null);
  const intervalRef = React.useRef<number>();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    console.log('inputRef', inputRef.current)
    intervalRef.current = window.setInterval(() => setLoading(prev => !prev), 3000)
    return () => {
      intervalRef.current && window.clearInterval(intervalRef.current)
    }
  }, []);

  return (
    <>
      <Record title="loading">
        <Button type="primary" loading>Download</Button>
        <Button type="primary" loading icon={<DownloadOutlined />} />
        <Button type="primary" icon={<DownloadOutlined />} />
        <Button type="primary" loading={loading}>Download</Button>
        <Button type="primary" loading={loading} icon={<DownloadOutlined />} />
        <Button type="primary" icon={<DownloadOutlined />} loading={loading}>Download</Button>
      </Record>
      <Record>
        <Button ref={inputRef} type="primary">primary button</Button>
        <Button type="default">default button</Button>
        <Button type="dashed">dahed button</Button>
        <Button type="text">text button</Button>
        <Button type="link">link button</Button>
      </Record>
      <Record title="icon">
        <Button type="primary" icon={<DownloadOutlined />} />
        <Button type="primary" icon={<DownloadOutlined />} size="small" />
        <Button type="primary" icon={<DownloadOutlined />} size="large" />
      </Record>
      <Record title="shape">
        <Button type="primary" shape="circle">1</Button>
        <Button type="primary" shape="round">12345678</Button>
      </Record>
      <Record title="danger">
        <Button type="primary" danger>primary button</Button>
        <Button type="default" danger>default button</Button>
        <Button type="dashed" danger>dahed button</Button>
        <Button type="text" danger>text button</Button>
        <Button type="link" danger>link button</Button>
      </Record>
      <Record>
        <Button type="default" block>block button</Button>
      </Record>
      <Record>
        <Button size="default">default size button</Button>
        <Button size="small">small size button</Button>
        <Button size="large">large size button</Button>
      </Record>
      <Record title="disabled">
        <Record>
          <Button type="primary">primary</Button>
          <Button type="primary" disabled>primary[disabled]</Button>
        </Record>
        <Record>
          <Button type="default">default</Button>
          <Button type="default" disabled>default[disabled]</Button>
        </Record>
        <Record>
          <Button type="dashed">dashed</Button>
          <Button type="dashed" disabled>dashed[disabled]</Button>
        </Record>
        <Record>
          <Button type="text">text</Button>
          <Button type="text" disabled>text[disabled]</Button>
        </Record>
        <Record>
          <Button type="default" danger>danger</Button>
          <Button type="default" danger disabled>danger[disabled]</Button>
        </Record>
      </Record>
      <Record title="ghost" gray>
        <Button type="primary" ghost>primary button</Button>
        <Button type="default" ghost>default button</Button>
        <Button type="dashed" ghost>dahed button</Button>
        <Button type="text" ghost>text button</Button>
        <Button type="link" ghost>link button</Button>
        <Button type="primary" danger ghost>danger button</Button>
        <Button ghost disabled>Ghost(disabled)</Button>
      </Record>
      <Record title="onclick">
        <Button type="primary" onClick={e => {
          console.log('e', e)
        }}>primary button</Button>
      </Record>
      <Record title="two char">
        <Button type="primary">按钮</Button>
      </Record>
    </>
  )
}

export default ButtonView;
