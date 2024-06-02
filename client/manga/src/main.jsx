import React from 'react';
import './index.css';
import { AuthContextProvider } from './contexts/AuthContext';
import ReactDOM from 'react-dom/client';
import Routes from './routes/index.jsx'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <Routes/>
    </AuthContextProvider>
  </React.StrictMode>
);

