import React, { useState } from 'react';
import "./Main.css";
import { useNavigate, useParams } from "react-router-dom";
import barLogo from '../../paran_logo.png';
import AgendaList from './AgendaList';
import axios from 'axios';
import { BASE_URL, CONFIG } from "../../BaseUrl";

function Agenda({ match }){
    const { id } = useParams();
    const agendaId = parseInt(id);
    const agenda = AgendaList.find((item) => item.id === agendaId);
    const navigate = useNavigate();

    const [vote, setVote] = useState(null); 
    const handleVote = (voteType) => {
        setVote(voteType.toLowerCase());
    };

    const handleFinalVote = () => {
        if (vote !== null) {
            const validVoteValues = ['AGREE', 'DISAGREE', 'ABSTENTION'];
            if (validVoteValues.includes(vote)) {
                const requestBody = {
                    agendaId: 1,
                    studentNumber: "20202020", 
                    voteValue: vote
                };
    
                axios.post(BASE_URL + "/api/client/vote", requestBody, CONFIG)
                    .then((response) => {
                        console.log(response.data);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                console.log("Invalid vote value.");
            }
        } else {
            console.log("Please select a vote option.");
        }
    };

    const { name } = "혜진조"; // 로그인한 회원의 이름과 학과
    const { major } = "컴퓨터소프트웨어공학과"; // 추후 수정....要

    return (
        <div className="Main-container">
            <div className='top-bar'>
                <img src={barLogo} alt="bar-logo" className="bar-logo" />
                <span className='paran-span'>제39대 총대의원회 파란</span>
                <div className='user-info'>
                    <span className='user-info-span'>컴퓨터소프트웨어공학과</span>
                    <span className='user-info-span'>조혜진</span>
                </div>
            </div>
            <div className='title-container'>
                <img src='https://cdn-icons-png.flaticon.com/128/81/81037.png' alt="back-icon" className='back-icon' onClick={() => navigate(-1)} />
                <span className='title-span'>{agenda.id}. {agenda.title}</span>
            </div>
            <div className='agenda-description-container'/>
            <div className='vote-container'>
                <button className={`vote-button abstention ${vote === 'abstention' ? 'selected' : ''}`} onClick={() => handleVote('ABSTENTION')}>기권</button>
                <button className={`vote-button agree ${vote === 'agree' ? 'selected' : ''}`} onClick={() => handleVote('AGREE')}>찬성</button>
                <button className={`vote-button disagree ${vote === 'disagree' ? 'selected' : ''}`} onClick={() => handleVote('DISAGREE')}>반대</button>
                <button className="vote-button final-vote" onClick={handleFinalVote}>투표하기</button>
            </div>
        </div>
    )
}

export default Agenda;
