// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/task1'; // ✅ use the correct path
import './App.css'; // or style.css if used instead

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <App />
  </React.StrictMode>
);
