import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from '@mxcins/components';
import routes from './.mx/render';

ConfigProvider.setup();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>{routes}</BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
