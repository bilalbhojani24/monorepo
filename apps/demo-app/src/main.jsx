import React from 'react';
import ReactDOM from 'react-dom';
import * as ReactRouter from 'react-router-dom';
import App from './App';

import './index.scss';

console.log(React.version);

ReactDOM.render(
  <ReactRouter.BrowserRouter>
    <App />
  </ReactRouter.BrowserRouter>,
  document.getElementById('root')
);
