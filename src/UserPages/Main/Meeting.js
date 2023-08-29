import React, { useState, useEffect } from 'react';
import "./Main.css";
import { useLocation, Link, useNavigate, useParams } from "react-router-dom";
import barLogo from '../../paran_logo.png';
import axios from 'axios';
import AgendaList from './AgendaList';
import { BASE_URL, CONFIG } from '../../BaseUrl'; 

function Meeting() {
    const location = useLocation();
    const navigate = useNavigate();
    const { meetingId } = useParams();
    const [meeting, setMeeting] = useState(null);
    const [agendaList, setAgendaList] = useState([]);

    useEffect(() => {
        axios.get(BASE_URL + `/api/client/${meetingId}`, CONFIG)
            .then((response) => {
                console.log(response);
                setMeeting(response.data.data);
                setAgendaList(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [meetingId]);

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
                <div className='back-icon-div'>
                    <img src='https://cdn-icons-png.flaticon.com/128/81/81037.png' alt="back-icon" className='back-icon' onClick={() => navigate(-1)}/>
                </div>
                {meeting && ( 
                    <div className='meeting-info-circle1'>
                        <div className='meeting-info-circle2'>
                            <span className='meeting-info'>{meeting.meetingName}</span>
                            <span className='meeting-date'>{meeting.meetingDate}</span>
                        </div>
                    </div>
                )}
            </div>
            
            <div className="agenda-container">
                {agendaList && agendaList.map((agenda) => (
                    <Link key={agenda.agendaId} to={`/agenda/${agenda.agendaId}`} style={{ textDecoration: 'none' }}>
                        <div key={agenda.agendaId} className="agenda-card">
                            <p className='agenda-state'>
                                {agenda.status === 'IN_PROGRESS' ? '투표 진행 중' : 
                                agenda.status === 'COMPLETE' ? '투표 완료' :
                                agenda.status === 'NOT_STARTED' ? '투표 대기' : ''}
                            </p>
                            <h3 className='agenda-info'>{agenda.agendaId}. {agenda.title}</h3>
                            {agenda.status === 'COMPLETE' && agenda.result !== undefined && (
                                <div className={`agenda-result ${agenda.result ? 'T' : 'F'}`} />
                            )}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Meeting;
