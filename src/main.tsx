import React from 'react';
import ReactDOM from 'react-dom/client';
import AppEntryPoint from './AppEntryPoint';
import './index.css';
import './toastify.css';

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <AppEntryPoint />
    </React.StrictMode>
  );
} else {
  alert('No root element found, unable to initialize the app.');
}
