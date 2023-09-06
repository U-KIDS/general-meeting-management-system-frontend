import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './UserPages/User/Login';
import LoginFail from './UserPages/User/LoginFail';
import Signup from './UserPages/User/Signup';
import Meeting from './UserPages/Main/Meeting';
import Agenda from './UserPages/Main/Agenda';
import QRcode from './Presentation/QRcode';
import Overview from './Presentation/Overview';
import VotingStatus from './Presentation/VotingStatus';
import Main from './UserPages/Main/Main';
import AdminLogin from './Presentation/AdminLogin';
import AdminLoginFail from './Presentation/AdminLoginFail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/meeting/:meetingId' element={<Meeting />} />
        <Route path="/agenda/:agendaId" element={<Agenda />} />
        <Route path='/login' element={<Login />} />
        <Route path='/loginfail' element={<LoginFail />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
      
      <Routes>
        <Route path='/adminlogin' element={<AdminLogin />} />
        <Route path='/adminloginfail' element={<AdminLoginFail />} />
        <Route path='/qrcode' element={<QRcode />} />
        <Route path='/overview' element={<Overview />} />
        <Route path="/overview/:id" element={<VotingStatus />} />
      </Routes>
    </Router>
  );
}

export default App;
