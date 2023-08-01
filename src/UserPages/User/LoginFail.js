import React from 'react';
import "./User.css";
import { useNavigate } from "react-router-dom";
import loginLogo from '../paran_logo.png';

function LoginFail(){
    const navigate = useNavigate();
    return(
        <div className="User-container">
            <div className='circle'/>
            <img src={loginLogo} alt="login-logo" className="login-logo"/>
            <div className='user-component'>     
                <div className="form-div">
                    <h2 className='loginFail'>로그인 정보가 일치하지 않습니다.</h2>
                    <button className="submit-button" onClick={() => navigate("/login")}>돌아가기</button>
                </div>
            </div>
            <h2 className='likelion'>Desiged by 🦁LIKELION 11th & Paran</h2>
        </div>
    )
}

export default LoginFail;