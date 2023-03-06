import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'App';
import './index.css';
import ThemeProvider from 'contexts/ThemeProvider';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="react-homework-template">
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
