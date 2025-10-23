import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ProjectManagementPlatform from './App'; // Note: importing our component

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ProjectManagementPlatform />
  </React.StrictMode>
);
