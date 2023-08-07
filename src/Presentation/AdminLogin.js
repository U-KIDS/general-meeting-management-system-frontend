import React, { useState } from 'react';
import axios from 'axios';
import "./AdminLogin.css";
import loginLogo from '../paran_logo.png';
import Input from "../UserPages/User/input";
import useInput from "../UserPages/User/useInput";
import { useNavigate } from "react-router-dom";

function AdminLogin(){
    const [studentNumber, setStudentNumber, resetStudentNumber] = useInput("");
    const [password, setPassword, resetPassword] = useInput("");
    const [loginError, setLoginError] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const response = await axios.post('API_ENDPOINT_URL/login', {
                studentNumber,
                password,
            });
    
            // 요청이 성공적으로 완료되었을 때의 처리
            console.log(response.data); // 백엔드에서 보내준 응답 데이터
    
            // 입력 데이터 초기화
            resetStudentNumber();
            resetPassword();
    
            // 로그인 성공 시 메인 페이지로 이동
            navigate('/', { state: { name: '이름', major: '학과' } });
        } catch (error) {
            // 요청이 실패했을 때의 처리
            console.error('로그인 실패:', error);
            // 로그인 실패 상태로 변경
            setLoginError(true);
        }
      };

    const navigate = useNavigate();

    return(
        <div className="User-container">
            <div className='User-header-container'/>
            <div className='logo-div'>
                <img src={loginLogo} alt="login-logo" className="login-logo"/>
            </div>
            <div className='login-user-component'>
                <form className="form-container" onSubmit={handleSubmit} action="/login" method="post">
                    <div className="form-div">
                        <span className='admin'>ADMIN</span>
                        <div className="div-inputbox">
                            <Input type="text" value={studentNumber} onChange={setStudentNumber} placeholder="학번"/>
                        </div>
                        <div className="div-inputbox">
                            <Input type="password" value={password} onChange={setPassword} placeholder="비밀번호"/>
                        </div>
                        <button type="submit" className="admin-submit-button">Log-in</button>
                        {loginError && navigate("/adminloginfail")}
                    </div>                    
                </form>      
            </div>
            <h2 className='likelion'>Desiged by 🦁LIKELION 11th & Paran</h2>
        </div>
    )
}

export default AdminLogin;