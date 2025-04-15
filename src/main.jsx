import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // ✅ App.jsx는 Router & Routes 포함된 라우터 최상단 컴포넌트

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
