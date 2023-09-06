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
    const [meeting, setMeeting] = useState({
        meetingTitle: "",
        meetingDate: ""
    });
    const [agendaList, setAgendaList] = useState([]);

    useEffect(() => {
        axios.get(BASE_URL + `/api/client/meeting/` + meetingId, {
            headers : {
                Authorization : `Bearer ${sessionStorage.getItem("token")}`
            }
        })
            .then((response) => {
                console.log(response);
                setMeeting(response.data.data.meetingTitle);
                let meetingDate = response.data.data.meetingDate.split('T')[0].replace(/-/g,".");
                setMeeting({
                    meetingTitle: response.data.data.meetingTitle,
                    meetingDate: meetingDate,
                })
                setAgendaList(response.data.data.agendas);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [meetingId]);

    const { name } = "혜진조"; // 로그인한 회원의 이름과 학과
    const { major } = "컴퓨터소프트웨어공학과"; // 추후 수정....要

    const agendaButtonHandler = (e) => {
        e.preventDefault()
        let [status, id] = e.target.id.split("^")
        console.log(id)
        if(status === "IN_PROGRESS") {
            navigate(`/meeting/${meetingId}/agenda/` + id)
        } else if (status === "COMPLETE") {
            alert("이미 종료된 투표입니다.")
        } else if (status === "NOT_STARTED") {
            alert("아직 시작 전인 투표입니다.")
        }
    }

    const getCardClass = (status) => {
        if(status === "IN_PROGRESS") {
            return "agenda-card"
        } else {
            return "agenda-card agenda-cannot-vote"
        }
    }

    const getColor = (status) => {
        if(status === "IN_PROGRESS") {
            return "state-green"
        } else {
            return "state-gray"
        }
    }

    return(
        <div className="Main-container">
            <div className='top-bar'>
                <img src={barLogo} alt="bar-logo" className="bar-logo"/>
                <span className='paran-span'>제39대 총대의원회 파란</span>
                <div className='user-info'>
                    <span className='user-info-span'>{sessionStorage.getItem("major")}</span>
                    <span className='user-info-span'>{sessionStorage.getItem("name")}</span>
                </div>
            </div>
            <div className='meeting-info-div'>
                <div className='back-icon-div'>
                    <img src='https://cdn-icons-png.flaticon.com/128/81/81037.png' alt="back-icon" className='back-icon' onClick={() => navigate("/")}/>
                </div>
                {meeting && ( 
                    <div className='meeting-info-circle1'>
                        <div className='meeting-info-circle2'>
                            <span className='meeting-info'>{meeting.meetingTitle}</span>
                            <span className='meeting-date'>{meeting.meetingDate}</span>
                        </div>
                    </div>
                )}
            </div>
            
            <div className="agenda-container">
                {agendaList && agendaList.map((agenda) => (
                    <button className='agenda-button' id={agenda.status + "^" + agenda.agendaId} onClick={agendaButtonHandler} style={{ textDecoration: 'none' }}>
                        <div id={agenda.status + "^" + agenda.agendaId} className={getCardClass(agenda.status)}>
                            <p id={agenda.status + "^" + agenda.agendaId} className={`agenda-state ${getColor(agenda.status)}`}>
                                {agenda.status === 'IN_PROGRESS' ? '투표 진행 중' : 
                                agenda.status === 'COMPLETE' ? '투표 종료' :
                                agenda.status === 'NOT_STARTED' ? '투표 대기' : ''}
                            </p>
                            <h3 id={agenda.status + "^" + agenda.agendaId} className='agenda-info'>{agenda.title}</h3>
                            {agenda.status === 'COMPLETE' && agenda.result !== undefined && (
                                <div id={agenda} className={`agenda-result ${agenda.result ? 'T' : 'F'}`} />
                            )}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default Meeting;
