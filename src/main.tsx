import React from 'react';
import ReactDOM from 'react-dom/client';
import AppEntryPoint from './AppEntryPoint';

// === Styles

// Radix UI CSS
import '@radix-ui/themes/styles.css';

import './css/index.css';
import './css/toastify.css';

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
