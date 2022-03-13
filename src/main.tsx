import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes } from 'react-router-dom';
import routes from './routes';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>{routes}</Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
