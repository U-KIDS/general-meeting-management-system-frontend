import React, { useState } from 'react';
import "./Presentation.css";
import Logo from '../paran_logo.png';
import { useNavigate, Link, useLocation } from "react-router-dom";
import Meeting from '../UserPages/Main/MeetingList';
import AgendaList from '../UserPages/Main/AgendaList';

function VotingStatus(){
    const navigate = useNavigate();
    const location = useLocation();
    const agendaTitle = new URLSearchParams(location.search).get('agendaTitle');

    return(
        <div className="Presentation-container">
            <div className='header-container'>
                {Meeting.map((meeting) => (
                    <span className='meeting-name'>{meeting.name}</span>
                ))}
                <span className='agenda-title'>{agendaTitle}</span>
            </div>
            <img src={Logo} alt="paran-logo" className="paran-logo"/>
            <div className='overview-container'>
                {Meeting.map((meeting) => (
                    <span className='overview-message'>{meeting.overview}</span>
                ))}                
            </div>
            <div className='agenda-list-container'>
                
            </div>
        </div>
    )
}

export default VotingStatus;