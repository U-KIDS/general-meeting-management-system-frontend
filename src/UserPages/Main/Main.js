import { useState, useEffect } from "react"
import "./Main.css";
import { useLocation, useNavigate } from "react-router-dom";
import barLogo from '../../paran_logo.png';
import axios from "axios";
import { BASE_URL, CONFIG } from "../../BaseUrl";

function Main(){
    const navigate = useNavigate();
    
    const [meetings, setMeetings] = useState([]);

    useEffect(() => {
        axios.get(BASE_URL + "/api/client/detail", CONFIG)
            .then((response) => {
                console.log(response);
                if (response.data.data && response.data.data.meetingList) {
                    setMeetings(response.data.data.meetingList);
                }
            })
            .catch((error => {
                console.log(error);
            }))
    }, []);

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
                {meetings.map((meeting) => (
                    <div key={meeting.meetingId} className='meeting-list' onClick={() => navigate(`/meeting/${meeting.meetingId}`)}>
                        <span className='meeting-list-info'>{meeting.meetingName}</span>
                        <span className='meeting-list-date'>{meeting.meetingDate}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Main;
