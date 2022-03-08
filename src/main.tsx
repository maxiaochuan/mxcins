import React from 'react'
import ReactDOM from 'react-dom'
import { ConfigProvider, Button } from '../packages/components';
import { Record } from './components';

const ButtonView = () => {
  const inputRef = React.useRef<HTMLElement>(null)

  React.useEffect(() => {
    console.log('inputRef', inputRef.current)
  });

  return (
    <>
      <Record>
        <Button ref={inputRef} type="primary">primary button</Button>
        <Button type="default">default button</Button>
        <Button type="dashed">dahed button</Button>
        <Button type="text">text button</Button>
        <Button type="link">link button</Button>
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

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider>
      <div>
        <h1>app</h1>
        <ButtonView />
      </div>
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
