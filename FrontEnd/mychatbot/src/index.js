// index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Crea un root.
const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) si usas TypeScript

// Inicializa la app en el root.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
