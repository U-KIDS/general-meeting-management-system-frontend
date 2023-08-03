import React, { useState } from 'react';
import "./Main.css";
import { useNavigate, useParams } from "react-router-dom";
import barLogo from '../../paran_logo.png';
import AgendaList from './AgendaList';

function Agenda({ match }){
    const { id } = useParams();
    const agendaId = parseInt(id);
    const agenda = AgendaList.find((item) => item.id === agendaId);
    const navigate = useNavigate();

    const [vote, setVote] = useState(null); 
    const handleVote = (voteType) => {
        setVote(voteType);
    };

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
            <div className='title-container'>
                <img src='https://cdn-icons-png.flaticon.com/128/81/81037.png' alt="back-icon" className='back-icon' onClick={() => navigate("/")}/>
                <span className='title-span'>{agenda.id}. {agenda.title}</span>
            </div>
            <div className='agenda-description-container'>
                <span className='agenda-description'>{agenda.description}</span>
            </div>
            <div className='vote-container'>
                <button className={`vote-button abstain ${vote === 'abstain' ? 'selected' : ''}`} onClick={() => handleVote('abstain')}>기권</button>
                <button className={`vote-button approve ${vote === 'approve' ? 'selected' : ''}`} onClick={() => handleVote('approve')}>찬성</button>
                <button className={`vote-button oppose ${vote === 'oppose' ? 'selected' : ''}`} onClick={() => handleVote('oppose')}>반대</button>
                <button className="vote-button final-vote" onClick={() => console.log('Final vote:', vote)}>투표하기</button>
            </div>
        </div>
    )
}

export default Agenda;
