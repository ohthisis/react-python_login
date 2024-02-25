import React from 'react';
import logo from './logo.svg';
import './App.css';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

import { Route,BrowserRouter,Routes } from 'react-router-dom';

function App() {
  return (
    <div className="vh-100 gradient-custom">
      <div className='container'>
        <h1 className='page-header text-center'>React and python Flask Login </h1>
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />}/>
          <Route path='/login' element={<LoginPage />}/>
          <Route path='/register' element={<RegisterPage />}/>
        </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
