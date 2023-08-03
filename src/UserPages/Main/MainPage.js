import React from 'react';
import "./Main.css";
import { useLocation, Link } from "react-router-dom";
import barLogo from '../paran_logo.png';
import AgendaList from './AgendaList';

function MainPage(){
    const location = useLocation();
    const { name } = "혜진조"; // 로그인한 회원의 이름과 학과
    const { major } = "컴퓨터소프트웨어공학과"; // 추후 수정....要

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
            <div className='meeting-info-div'>
                <div className='meeting-info-circle1'>
                    <div className='meeting-info-circle2'>
                        <span className='meeting-info'>제98회<br></br>대의원<br></br>정기총회</span>
                        <span className='meeting-date'>2023.09.11</span>
                    </div>
                </div>
            </div>
            
            <div className="agenda-container">
                {AgendaList.map((agenda) => (
                    <Link key={agenda.id} to={`/agenda/${agenda.id}`} style={{ textDecoration: 'none' }}>
                        <div key={agenda.id} className="agenda-card">
                            <p className='agenda-state'>{agenda.activate ? '투표 진행 중' : '투표 대기'}</p>
                            <h3 className='agenda-title'>{agenda.id}. {agenda.title}</h3>
                            {agenda.result !== undefined && (
                                <div className={`agenda-result ${agenda.result ? 'T' : 'F'}`}/>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default MainPage;
