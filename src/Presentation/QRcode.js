import React, { useState } from 'react';
import "./Presentation.css";
import Logo from '../paran_logo.png';
import { useNavigate } from "react-router-dom";
import Meeting from '../UserPages/Main/Meeting';

function QRcode(){
    const navigate = useNavigate();

    return(
        <div className="Presentation-container">
            <div className='header-container'>
                {Meeting.map((meeting) => (
                    <span className='meeting-name'>{meeting.name}</span>
                ))}
            </div>
            <img src={Logo} alt="paran-logo" className="paran-logo"/>
            <div className='QRcode-container'>
                
            </div>
            <span className='QRcode-message'>
                상단의 QR코드를 촬영하여<br></br>
                투표 시스템에 접속 후 로그인해주세요.
            </span>
        </div>
    )
}

export default QRcode;