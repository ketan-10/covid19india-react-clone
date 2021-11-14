import './wdyr';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './i18/i18n';
import './index.css';
import App from './App';

ReactDOM.render(
  <Suspense fallback={<div />}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Suspense>,
  document.getElementById('root')
);
