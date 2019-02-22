/* eslint-disable */
import 'bootstrap/dist/css/bootstrap.css';
import 'react-table/react-table.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Main from './Components/Main';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
  <Main />,
  document.getElementById('root'),
);

registerServiceWorker();
