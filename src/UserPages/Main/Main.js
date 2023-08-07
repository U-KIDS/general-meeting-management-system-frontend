import React from 'react';
import "./Main.css";
import { useLocation, Link } from "react-router-dom";
import barLogo from '../../paran_logo.png';
import AgendaList from './AgendaList';
import Meeting from './MeetingList';

function Main(){
    const location = useLocation();

    return(
        <div className="Main-container">
            <div className='top-bar'>
                <img src={barLogo} alt="bar-logo" className="bar-logo"/>
                <span className='paran-span'>제39대 총대의원회 파란</span>
                <div className='user-info'>
                    <span className='user-info-span'>컴퓨터소프트웨어공학과</span>
                    <span className='user-info-span'>조혜진</span>
                </div>
            </div>
            <div className='identitycard-container'>
                <div className='identitycard-top-bar'>
                    <img src={barLogo} alt="bar-logo" className="bar-logo"/>
                    <span className='identitycard-top-bar-span'>2023년 대의원총회</span>
                </div>
                <img src="https://i.pinimg.com/564x/e2/21/f0/e221f0954109ff15ad17ad7d05a1859b.jpg" alt="profile" className="profile-img"/>
                <div className='identitycard-div'>
                    <div className='identitycard-info-div'>
                        <span className='identitycard-info'>college</span>
                        <span className='identitycard-value'>SW융합대학</span>
                    </div>
                    <div className='identitycard-info-div'>
                        <span className='identitycard-info'>major</span>
                        <span className='identitycard-value'>컴퓨터소프트웨어공학과</span>
                    </div>
                    <div className='identitycard-info-div'>
                        <span className='identitycard-info'>name</span>
                        <span className='identitycard-value'>김멋사</span>
                    </div>
                </div>
            </div>
            <div className='meeting-list-div'>
                <div className='meeting-list-line'>
                    <span className='identitycard-info'>참여 가능한 회의</span>
                </div>
                {Meeting.map((meeting) => (
                    <div key={meeting.id} className='meeting-list'>
                        <span className='meeting-list-info'>{meeting.name}</span>
                        <span className='meeting-list-date'>{meeting.meetingDate}</span>
                    </div>
                ))}
            </div>
            
           
        </div>
    )
}

export default Main;
