import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { ConfigProvider, Button, Divider } from '../packages/components';
import { Record } from './components';
import routes from './routes';

const DividerView = () => {
  return (
    <>
    <Record title="vertical">
      <div>
        <span>Text</span>
        <Divider type="vertical" />
        <a href="#">Link</a>
        <Divider type="vertical" />
        <a href="#">Link</a>
      </div>
    </Record>
      <Record>
    <p> Lorem ipsum dolor sit amet </p>
    <Divider />
    <Divider dashed />
    <Divider orientation="left">Text</Divider>
    <Divider orientation="center">Text</Divider>
    <Divider orientation="right">Text</Divider>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
      probare, quae sunt a te dicta? Refert tamen, quo modo.
    </p>
    <Divider dashed />
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
      probare, quae sunt a te dicta? Refert tamen, quo modo.
    </p>
      </Record>
    </>
  )
}

const Layout: React.FC = props => {
  const { children } = props;
  console.log(props, children);
  return <>layout<Outlet /></>;
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {routes}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
