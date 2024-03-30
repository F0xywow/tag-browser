import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const root = document.getElementById('root');
if (root !== null) {
  ReactDOM.createRoot(root).render(<App />);
}