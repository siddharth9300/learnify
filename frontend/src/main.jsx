import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Toaster position="bottom-left"
  reverseOrder={true} />
  </React.StrictMode>
);