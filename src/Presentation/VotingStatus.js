import React from 'react';
import "./Presentation.css";
import Logo from '../paran_logo.png';
import { useLocation, useNavigate } from "react-router-dom";
import Meeting from '../UserPages/Main/MeetingList';
import VotingStatusList from './VotingStatusList';

function VotingStatus() {
    const location = useLocation();
    const navigate = useNavigate();
    const agendaTitle = new URLSearchParams(location.search).get('agendaTitle');
    const agendaId = location.pathname.split('/')[2];

    // 학과별로 찬성, 반대, 기권 개수를 담을 객체 생성
    const collegeVotes = {};

    // 전체 찬성, 반대, 기권 개수를 담을 변수 생성
    let totalApprove = 0;
    let totalOppose = 0;
    let totalAbstain = 0;

    // VotingStatusList를 순회하면서 학과별 및 전체 개수 계산
    VotingStatusList.forEach((college) => {
        const filteredMembers = college.members.filter(member => member.agenda === agendaId);

        if (filteredMembers.length > 0) {
            if (!collegeVotes[college.name]) {
                collegeVotes[college.name] = {
                    approve: 0,
                    oppose: 0,
                    abstain: 0,
                };
            }

            filteredMembers.forEach((member) => {
                // Add a conditional check before accessing the 'vote' property
                if (member.vote) {
                    collegeVotes[college.name][member.vote]++;
                    if (member.vote === 'approve') totalApprove++;
                    else if (member.vote === 'oppose') totalOppose++;
                    else if (member.vote === 'abstain') totalAbstain++;
                }
            });
        }
    });

    return (
        <div className="Presentation-container">
            <div className='header-container'>
                {Meeting.map((meeting) => (
                    <span key={meeting.id} className='meeting-name'>
                        <img src='https://cdn-icons-png.flaticon.com/128/7664/7664603.png' alt="back-icon" className='pre-back-icon' onClick={() => navigate(-1)}/>
                        {meeting.name}
                    </span>
                ))}
                <span className='agenda-title'>{agendaId}. {agendaTitle}</span>
            </div>
            <img src={Logo} alt="paran-logo" className="paran-logo" />
            <div className='overview-container'>
                <div className="overview-cards">
                {VotingStatusList.map((college, index) => (
                    <div key={index} className="overview-card">
                        <span className='collegename-span'>
                            {college.name}
                            <span className="vote-counts">
                                {collegeVotes[college.name] && collegeVotes[college.name].approve !== undefined ? `찬성 ${collegeVotes[college.name].approve}` : '찬성 0'}　|　
                                {collegeVotes[college.name] && collegeVotes[college.name].oppose !== undefined ? `반대 ${collegeVotes[college.name].oppose}` : '반대 0'}　|　
                                {collegeVotes[college.name] && collegeVotes[college.name].abstain !== undefined ? `기권 ${collegeVotes[college.name].abstain}` : '기권 0'}
                            </span>
                        </span>
                        <div className="member-list">
                            {college.members
                                .filter(member => member.agenda === agendaId) // 해당 안건에 투표한 사용자만 필터링
                                .map((member, memberIndex) => (
                                    <span key={memberIndex} className={`member-name ${member.vote}`}>{member.name}</span>
                                ))}
                        </div>
                    </div>
                ))}
                    <div className="total-div">
                        <span className={`total-span approve`}>찬성{totalApprove}　</span>
                        <span className={`total-span oppose`}>반대{totalOppose}　</span>
                        <span className={`total-span abstain`}>기권{totalAbstain}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VotingStatus;
