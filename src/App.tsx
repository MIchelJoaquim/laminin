import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
} from "react-router-dom";
import { Routes } from './routes';
import { AuthProvider } from './context/auth';
import Layout from './components/layout/index';


function App() {
  return (
    <div className="App">
      <AuthProvider>
      <Router>
        <Layout>
            <Routes/>
        </Layout>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
