import React from 'react'
import ReactDOM from 'react-dom'
import { ConfigProvider, Button } from '../packages/components/src';
import { Record } from './components';

import { tw } from 'twind';

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider>
      <div>
        <h1>app</h1>
        <Record>
          <Button type="primary">primary button</Button>
          <Button type="default">default button</Button>
          <Button type="dashed">dahed button</Button>
          <Button type="text">text button</Button>
        </Record>
        <Record title="danger">
          <Button type="primary" danger>primary button</Button>
          <Button type="default" danger>default button</Button>
          <Button type="dashed" danger>dahed button</Button>
          <Button type="text" danger>text button</Button>
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
      </div>
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
