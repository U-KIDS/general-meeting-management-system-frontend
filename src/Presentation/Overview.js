import React, { useState } from 'react';
import "./Presentation.css";
import Logo from '../paran_logo.png';
import { useNavigate, Link, useLocation } from "react-router-dom";
import Meeting from '../UserPages/Main/Meeting';
import AgendaList from '../UserPages/Main/AgendaList';

function Overview(){
    const navigate = useNavigate();
    const location = useLocation();
    const agendaTitle = new URLSearchParams(location.search).get('agendaTitle');

    return(
        <div className="Presentation-container">
            <div className='header-container'>
                {Meeting.map((meeting) => (
                    <span className='meeting-name'>{meeting.name}</span>
                ))}
            </div>
            <img src={Logo} alt="paran-logo" className="paran-logo"/>
            <div className='overview-container'>
                {Meeting.map((meeting) => (
                    <span className='overview-message'>{meeting.overview}</span>
                ))}                
            </div>
            <div className='agenda-list-container'>
                {AgendaList.map((agenda) => (
                    <Link key={agenda.id} to={`/agendaadmin/${agenda.id}?agendaTitle=${encodeURIComponent(agenda.title)}`} style={{ textDecoration: 'none' }}>
                        <div key={agenda.id} className="agendaAdmin-card">
                            <h3 className='agendaAdmin-id'>{agenda.id}</h3>
                            <h3 className='agendaAdmin-title'>{agenda.title}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Overview;