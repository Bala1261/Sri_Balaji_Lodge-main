import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';

window.addEventListener('error', (event) => {
  const error = document.createElement('pre');

  error.style.cssText = `
    position: fixed;
    inset: 0;
    z-index: 999999;
    margin: 0;
    padding: 20px;
    background: white;
    color: red;
    font-family: monospace;
    font-size: 14px;
    white-space: pre-wrap;
    overflow: auto;
  `;

  error.textContent =
    `JavaScript Error:\n\n${event.message}\n\n` +
    `${event.filename || ''}:${event.lineno || ''}:${event.colno || ''}`;

  document.body.appendChild(error);
});

window.addEventListener('unhandledrejection', (event) => {
  const error = document.createElement('pre');

  error.style.cssText = `
    position: fixed;
    inset: 0;
    z-index: 999999;
    margin: 0;
    padding: 20px;
    background: white;
    color: red;
    font-family: monospace;
    font-size: 14px;
    white-space: pre-wrap;
    overflow: auto;
  `;

  error.textContent =
    `Unhandled Promise Error:\n\n${String(event.reason)}`;

  document.body.appendChild(error);
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);