import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
} from "react-router-dom";
import { Routes } from './routes';
import { AuthProvider } from './context/auth';


function App() {
  return (
    <div className="App">
      <AuthProvider>
          <Router>
            <Routes/>
          </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
