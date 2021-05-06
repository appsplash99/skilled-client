import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { LibraryContextProvider } from './context/libraryState';

ReactDOM.render(
  <React.StrictMode>
    <LibraryContextProvider>
      <Router>
        <App />
      </Router>
    </LibraryContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
