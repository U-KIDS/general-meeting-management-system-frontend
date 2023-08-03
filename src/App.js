import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './UserPages/User/Login';
import LoginFail from './UserPages/User/LoginFail';
import Signup from './UserPages/User/Signup';
import MainPage from './UserPages/Main/MainPage';
import Agenda from './UserPages/Main/Agenda';
import QRcode from './Presentation/QRcode';
import Overview from './Presentation/Overview';
import VotingStatus from './Presentation/VotingStatus';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  });

  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path="/agenda/:id" element={<Agenda />} />
        <Route path='/login' element={<Login />} />
        <Route path='/loginfail' element={<LoginFail />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
      
      <Routes>
        <Route path='/qrcode' element={<QRcode />} />
        <Route path='/overview' element={<Overview />} />
        <Route path="/overview/:id" element={<VotingStatus />} />
      </Routes>
    </Router>
  );
}

export default App;
