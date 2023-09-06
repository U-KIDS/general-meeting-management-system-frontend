import { useState, useEffect } from "react"
import "./Main.css";
import { useLocation, useNavigate } from "react-router-dom";
import barLogo from '../../paran_logo.png';
import axios from "axios";
import { BASE_URL, CONFIG } from "../../BaseUrl";
import { TOKEN_CONFIG } from "../../api/api";

function Main(){
    const navigate = useNavigate();
    
    const [user, setUser] = useState({
        name:"",
        college:"",
        major:""
    })
    const [meetings, setMeetings] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080" + "/api/client/detail", {
            headers : {
                Authorization : `Bearer ${sessionStorage.getItem("token")}`
            }
        })
            .then((response) => {
                if (response.data.status != 200) {
                    navigate("login")
                }
                setMeetings(response.data.data.meetingList);
                setUser({
                    name: response.data.data.name,
                    college: response.data.data.college,
                    major: response.data.data.major
                })
                sessionStorage.setItem("name", response.data.data.name)
                sessionStorage.setItem("major", response.data.data.major)
            })
            .catch((error => {
                console.log(error);
            }))
    }, []);

    const getMeetingDateFormat = (date) => {
        return date.split('T')[0].replace(/-/g,".");
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
            <div className='identitycard-container'>
                <div className='identitycard-top-bar'>
                    <img src={barLogo} alt="bar-logo" className="bar-logo"/>
                    <span className='identitycard-top-bar-span'>2023년 대의원총회</span>
                </div>
                <img src="https://i.pinimg.com/564x/e2/21/f0/e221f0954109ff15ad17ad7d05a1859b.jpg" alt="profile" className="profile-img"/>
                <div className='identitycard-div'>
                    <div className='identitycard-info-div'>
                        <span className='identitycard-info'>college</span>
                        <span className='identitycard-value'>{user.college}</span>
                    </div>
                    <div className='identitycard-info-div'>
                        <span className='identitycard-info'>major</span>
                        <span className='identitycard-value'>{user.major}</span>
                    </div>
                    <div className='identitycard-info-div'>
                        <span className='identitycard-info'>name</span>
                        <span className='identitycard-value'>{user.name}</span>
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
                        <span className='meeting-list-date'>{getMeetingDateFormat(meeting.meetingDate)}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Main;
