import React, { useEffect, useState } from 'react';
import "./Main.css";
import { useNavigate, useParams } from "react-router-dom";
import barLogo from '../../paran_logo.png';
import AgendaList from './AgendaList';
import axios from 'axios';
import { BASE_URL, CONFIG } from "../../BaseUrl";

function Agenda({ match }){
    const { meetingId, agendaId } = useParams();
    const navigate = useNavigate();

    const [vote, setVote] = useState(null); 
    const [agenda, setAgenda] = useState({});
    const handleVote = (voteType) => {
        setVote(voteType);
    };

    useEffect(() => {
        axios.get(BASE_URL + `/api/client/agenda/${agendaId}`, {
            headers : {
                Authorization : `Bearer ${sessionStorage.getItem("token")}`
            }
        })
        .then((response) => {
            console.log(response)
            setAgenda(response.data.data)
        })
    },[])

    const handleFinalVote = () => {
        if (vote !== null) {
            const validVoteValues = ['AGREE', 'DISAGREE', 'ABSTENTION'];
            if (validVoteValues.includes(vote)) {
                console.log(vote)
                axios.post(BASE_URL + `/api/client/agenda/${agendaId}/vote?voteValue=${vote}`, null, {
                    headers : {
                        Authorization : `Bearer ${sessionStorage.getItem("token")}`
                    }
                })
                    .then((response) => {
                        console.log(response)
                        if (response.data.status === 200) {
                            navigate("/meeting/" + meetingId)
                        } else if(response.data.status === 400) {
                            alert("이미 투표 완료하셨습니다.")
                            navigate("/meeting/" + meetingId)
                        }
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
                    <span className='user-info-span'>{sessionStorage.getItem("major")}</span>
                    <span className='user-info-span'>{sessionStorage.getItem("name")}</span>
                </div>
            </div>
            <div className='title-container'>
                <img src='https://cdn-icons-png.flaticon.com/128/81/81037.png' alt="back-icon" className='back-icon' onClick={() => navigate("/meeting/" + meetingId)} />
                <span className='title-span'>투표</span>
            </div>
            <div className='agenda-description-container'>
                <div className='table-component'>
                    <div className='table-title'>의안 번호</div>
                    <div className='table-contents'>{agenda.agendaNumber}</div>
                </div>
                <div className='table-component'>
                    <div className='table-title'>의안 명</div>
                    <div className='table-contents'>{agenda.title}</div>
                </div>
                <div className='table-component'>
                    <div className='table-title'>입안처</div>
                    <div className='table-contents'>{agenda.agendaCreateBy}</div>
                </div>
            </div>
            <div className='vote-container'>
                <button className={`vote-button abstention ${vote === 'ABSTENTION' ? 'selected' : ''}`} onClick={() => handleVote('ABSTENTION')}>기권</button>
                <button className={`vote-button agree ${vote === 'AGREE' ? 'selected' : ''}`} onClick={() => handleVote('AGREE')}>찬성</button>
                <button className={`vote-button disagree ${vote === 'DISAGREE' ? 'selected' : ''}`} onClick={() => handleVote('DISAGREE')}>반대</button>
                <button className="vote-button final-vote" onClick={handleFinalVote}>투표하기</button>
            </div>
        </div>
    )
}

export default Agenda;
